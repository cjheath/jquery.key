JQuery Key plugin
=================

- Uniform access to printable and non-printable key codes.

Browsers differ in the way they present keyboard events.
See http://quirksmode.org/dom/events/index.html
and http://unixpapa.com/js/key.html
and http://ejohn.org/blog/keypress-in-safari-31/

This plugin watches the keyup/keydown/keypress events, checking for all
browser-specific details, and delivering events that represent either
printable characters or special keys.

An event that represents printable characters has the "str" property set.
An event that reqresents a special key has the "code" property set.
The most commonly used special keys are in list below.

To initialize key processing, call "jQuery.key". You may pass a function,
or an object containing the property "defaultKeyHandler" to receive keys
when no other object has taken focus.

To take keyboard focus, call $.key.focus passing either a function to
receive the augmented event, or an object with a "key" method.
$.key.focus returns the previous focus, so you can restore it, or just
call defocus to revert to the default handler.

A key handling function should return true to allow the event to bubble,
or false to stop it bubbling.

Copyright: Clifford Heath, Data Constellation, http://dataconstellation.com, 2011
License: MIT. See http://github.com/cjheath/jquery.key
