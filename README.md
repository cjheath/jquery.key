JQuery Key plugin
=================

Uniform access to printable and non-printable key codes.
--------------------------------------------------------

Browsers differ in the way they present keyboard events.
See http://quirksmode.org/dom/events/index.html
and http://unixpapa.com/js/key.html
and http://ejohn.org/blog/keypress-in-safari-31/

This plugin watches the keyup/keydown/keypress events, checking for all
browser-specific details, and delivering events that represent either
printable characters or special keys, with an additional property set.

An event that represents printable characters has the "str" property set.
An event that represents a special key has the "code" property set.
The most commonly used special keys are in list below.

You can set a default key event handler using $.key.defaultKeyHandler(fn);
where fn is either a function to receive the events, or an object that
contains such a function as a method called "key".
The defaultKeyHandler receives key events when no other object has taken
focus.

To take keyboard focus, call $.key.focus passing again either a function
to receive the augmented event, or an object with a "key" method.
$.key.focus returns the previous focus, so you can restore it, or just
call $.key.defocus to revert to the default handler.

A key handling function should return true to allow the event to bubble,
or false to stop it bubbling.

Special keys
------------

Special keys are any key which does not result in text input, or
which is a control key.

In general, control keys run from 0 (ctrl-shift-@) up to 31, but
when ctrl is used in a non-control combination (like ctrl-1), we
deliver the ASCII code for '1', which is code: 49.
event.ctrlKey will also be set, of course.

None of the other special key codes clash with such combos, except
ctrl (key 17 or ^Q), shift (16 or ^P) alt (18 or ^R).

The following special keys have names assigned:

  $.key.BACKSPACE
  $.key.TAB
  $.key.ENTER
  $.key.SHIFT
  $.key.CONTROL
  $.key.CAPS_LOCK
  $.key.ESCAPE
  $.key.SPACE
  $.key.PAGE_UP
  $.key.PAGE_DOWN
  $.key.END
  $.key.HOME
  $.key.LEFT
  $.key.UP
  $.key.RIGHT
  $.key.DOWN
  $.key.INSERT
  $.key.DELETE
  $.key.NUMPAD_MULTIPLY
  $.key.NUMPAD_ADD
  $.key.NUMPAD_ENTER
  $.key.NUMPAD_SUBTRACT
  $.key.NUMPAD_DECIMAL
  $.key.NUMPAD_DIVIDE
  $.key.COMMA
  $.key.PERIOD

Status
------

Tested on Chrome, FF3, FF3.5, Opera, Safari (Mac), IE7, IE8.

Legal
-----

Copyright: Clifford Heath, Data Constellation, http://dataconstellation.com, 2011
License: MIT. See http://github.com/cjheath/jquery.key
