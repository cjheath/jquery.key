/*
 * JQuery Key plugin - Uniform access to printable and non-printable key codes.
 *
 * Browsers differ in the way they present keyboard events.
 * See http://quirksmode.org/dom/events/index.html
 * and http://unixpapa.com/js/key.html
 * and http://ejohn.org/blog/keypress-in-safari-31/
 *
 * This plugin watches the keyup/keydown/keypress events, checking for all
 * browser-specific details, and delivering events that represent either
 * printable characters or special keys.
 *
 * An event that represents printable characters has the "str" property set.
 * An event that reqresents a special key has the "code" property set.
 * The most commonly used special keys are in list below.
 *
 * To initialize key processing, call "jQuery.key". You may pass a function,
 * or an object containing the property "defaultKeyHandler" to receive keys
 * when no other object has taken focus.
 *
 * To take keyboard focus, call $.key.focus passing either a function to
 * receive the augmented event, or an object with a "key" method.
 * $.key.focus returns the previous focus, so you can restore it, or just
 * call defocus to revert to the default handler.
 *
 * A key handling function should return true to allow the event to bubble,
 * or false to stop it bubbling.
 *
 * Copyright: Clifford Heath, Data Constellation, http://dataconstellation.com, 2011
 * License: MIT. See http://github.com/cjheath/jquery.key
 */
(function($) {
  $.key = new function(options) {
    /*
     * In general, control keys run from 0 (ctrl-shift-@) up to 31,
     * but when ctrl is used in a non-control combination (like ctrl-1),
     * we deliver the ASCII code for '1', which is code: 49.
     * event.ctrlKey will also be set, of course.
     * None of the other special key codes clash with such combos,
     * except ctrl (key 17 or ^Q), shift (16 or ^P) alt (18 or ^R).
     */
    this.BACKSPACE = 8;
    this.TAB = 9;
    this.ENTER = 13;
    this.SHIFT = 16;
    this.CONTROL = 17;
    this.CAPS_LOCK = 20;
    this.ESCAPE = 27;
    this.SPACE = 32;
    this.PAGE_UP = 33;
    this.PAGE_DOWN = 34;
    this.END = 35;
    this.HOME = 36;
    this.LEFT = 37;
    this.UP = 38;
    this.RIGHT = 39;
    this.DOWN = 40;
    this.INSERT = 45;
    this.DELETE = 46;
    this.NUMPAD_MULTIPLY = 106;
    this.NUMPAD_ADD = 107;
    this.NUMPAD_ENTER = 108;
    this.NUMPAD_SUBTRACT = 109;
    this.NUMPAD_DECIMAL = 110;
    this.NUMPAD_DIVIDE = 111;
    this.COMMA = 188;
    this.PERIOD = 190;

    var defaultKeyHandler = function(e) { return true; };
    var keyboardFocus = defaultKeyHandler;	  // Current key handler
    this.defaultKeyHandler = function(h) {
      keyboardFocus = defaultKeyHandler = h;
    };

    /*
     * A key handler may be a function or an object that has a function called "key"
     * A handler should return true to allow the event to bubble, false to stop it.
     */
    this.focus = function(handler) {
      if (arguments.length === 0)
	return keyboardFocus;
      var prevFocus = keyboardFocus;
      keyboardFocus = handler || defaultKeyHandler;
      return prevFocus;
    };

    this.defocus = function() {
      keyboardFocus = defaultKeyHandler;
    };

    this.hasFocus = function(obj) {
      return keyboardFocus === obj;
    };

    var deliver = function(e, code, str) {
      e.code = code;
      e.str = str;
      return keyboardFocus.call ? keyboardFocus(e) : keyboardFocus.key(e);
    };

    /* Record the key code from a keydown event to use on auto-repeat and on keyup if no keypress follows */
    var downKey;

    if ($.browser.msie || $.browser.webkit) {
      // Handle special keys using keydown; these browsers don't send keypress for these events
      $(document).bind('keydown', function(e){
	var bubble = true;
	if (downKey && downKey == e.keyCode)    // Auto-repeat
	  bubble = deliver(e, downKey);
	downKey = e.keyCode;
	if ((e.charCode || e.which) == 8)
	  bubble = false;	/* Don't go to the previous page */
	return bubble;
      });
      $(document).bind('keyup', function(e){
	if (downKey)  // There was no keypress in between; must be a special key
	  deliver(e, downKey);
	downKey = null;
	return true;
      });
    }

    if (false && jQuery.browser.webkit) {
      /*
       * textInput only occurs when browser focus is on a text input widget.
       * Then it occurs after keypress, so we can't easily support both. Humbug.
       * I guess if you want this we could deliver the keypress on a timer(0)...
       */
      document.addEventListener('textInput', function(e) {
	return deliver(e, false, e.originalEvent.data);
      });
    } else {
      $(document).bind('keypress',function(e) {
	var charCode = e.charCode || e.which;
	downKey = null;
	if ($.browser.opera) {
	  if (!e.originalEvent.which)   // Without this, left-arrow and single-quote are identical
	    charCode = null;
	  e.ctrlKey = e.metaKey;   // Opera also sets metaKey instead of ctrlKey :-( ...)
	} else if ($.browser.msie)
	  charCode = e.which;
	else
	  charCode = e.charCode;
	if (charCode && !e.metaKey && !e.altKey && !e.ctrlKey && charCode >= 32)
	  return deliver(e, false, String.fromCharCode(charCode));
	else  // control key on MSIE, or any special key on Firefox, etc
	  return deliver(e, e.keyCode);
      });
    }

  };
})(jQuery);
