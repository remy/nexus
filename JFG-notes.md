## NeXT UX fidelity:

- [x] N1. Keyboard shortcuts were displayed in lowercase in menus. A few of them were uppercase, indicating the use of Cmd-Shift, e.g. if Cmd-s did "Save", Cmd-Shift-S did "Save as…" (on Tim's app, it did "Save all"). In the menus, there is a mix of upper- and lowercase, and I'm not sure whether they are correct. For example, "Print" should be lowercase p, unless Tim did something special to make it uppercase. Conversely, "Home" has a big H because lowercase h was the standard "Hide" feature to hide an app from the screen, which we still have on macOS. There is a duplicate "x" shortcut in the Edit menu, on the "Spelling…" item; not sure what shortcut it would have in reality.
- [x] N2. When you open a menu, the main window loses focus (its title bar goes gray instead of black); I don't think it should. You can double-check that on your NeXT VM.
- [x] N3. When clicking a menu item that does nothing (e.g. Page Layout), the main window loses focus too – it shouldn't.
- [ ] N4. When a menu is detached and its parent item is clicked again, I believe that the correct behaviour was to flash a second instance of that menu to the right of the main menu, while leaving the detached one pinned. Thus a click-and-drag-right would let you perform an action, and the second instance would vanish after doing its job.
- [-] N5. When I grab a detachable menu by the middle of its title bar and drag it to the left side of the screen, part or all of the title gets obscured when I keep dragging the mouse after hitting the left side. Probably triggering text selection of white text on black background that turns it black?
- [ ] N6. Window resizing does not work. You should be able to drag up/down when grabbing the lower gray bar by the middle, and drag diagonally when grabbing it in a corner.

~~N7. Is it possible to disable the elasticity+rebound effect when scrolling to the top or bottom of a window? It's cute but anachronistic for the NeXT windowing system. (We also did not have a scroll wheel, but that is worth keeping)~~

- [ ] N8. Have you thought of a way to convey that people can use keyboard shortcuts with "Ctrl-Alt", as you explained to me?

## Flow details:

- [x] F1. In the Open/Save file dialog, you could choose a file by double clicking its name. No need to press OK in that case.
- [x] F2. In the Open/Save file dialog, typing Enter should trigger the OK button
- [x] F3. Saving a file should add the .html extension automatically. Without an extension, the browser does not open it properly afterwards (a different bug, which does not need to be addressed if F3 is corrected).
- [ ] F4. When I have selected text in a window, and I click on a menu, the selection is lost. Should be kept as is.
- [x] F5. "Select All" does not work, apparently does nothing.
- [x] F6. "Cut", "Copy", "Paste" do not work either _(RS paste requires special permissions which I'm not implementing right now…)._
- [x] F7. When closing a document that has been edited ("dirty" flag set with broken cross), the user should be offered to save it or abandon changes.
- [x] F8. "Save all edited windows" does not work.
- [x] F9. "Close all other windows" closes everything; it should keep the currently focused window open instead. This was intended to reduce clutter after some navigation (very necessary in this document-centric "every page gets its window" model). Update: I tried again, and it behaved as expected; maybe I stumbled on an edge case earlier (RS: test with menu in focus).
- [x] F10. "Home" goes nowhere. It should open the global welcome page by default ("Welcome to the Universe of HyperText"). If we close all windows, we have nowhere to go (unless we resort to typing a URL manually – yuck!)
- [x] F11. The "Open URL" panel should accept a plain domain name, and autofill the required http(s). That's now how it worked back then, but it's just too confusing to type "google.com" and get a 400 "Bad request" error from the proxy. (Side note 1: try youtube.com, it looks amazingly good!) (Side note 2: the menu is called "Open from full document reference" because those things were not called URLs yet; we went from "hypertext reference" to "document reference" to "document address" to "document identifier" to "universal document identifier" (UDI, first attempt at the standards track) to "universal resource identifier" (URI) to "uniform resource locator" (URL). Phew. Lost two years at the IETF just settling on a name. I still don't understand why they insisted this extensible naming scheme was not "universal"; Tim was very frustrated.)
- [x] F12. Typing "Enter" in that panel should trigger the Open button, and go to the specified address.

## Hypertext issues

- [x] H1. "Link to file…" and "Link to new" don't work. I saw them working in an earlier version, though _(RS: no, didn't implement this yet!)_
- [x] H2. "Mark selection" creates three copies of whatever text was selected, and keeps the middle copy selected and marked (I checked that the HTML anchor was created, by saving a local copy and viewing the source code). _(RS: needs more testing, but I think okay)_
- [x] H3. "Link to marked" works, but also creates three copies of the selected text, with the middle copy bearing the link. Creating more links to the same place works fine (without triplicating the text), but the triple text returns after marking another link target.
- [x] H4. When marking several destinations in a page, they all get the same "0" anchor name. Also the <NEXTID> element is not generated, perhaps that's why it fails to increment the used anchor count.
- [-] H5. When creating several links from the same page, the generated code looks like this:
```
  -----
<span class="hash-text">His true passion is home robots<a name="0"
href="file://WWW/Koh.html#0">home robots</a>home robots that make you
smlie!&nbsp;</span><div><br></div><div>Strange things happen with <a
name="1" href="file://www/Koh.html#0#1">the second link</a>.<br><p>
-----
  ```
I left the "triplicate text" in place so you can see bug H3's effect. Weird that the target of the second link has dual anchors #0#1 (I linked to a different marked target anchor, so I should get #1 only). The final `</div>` is pushed to the end of the file, after the line separator and address part; is that intentional?
- [x] H6. In generated code, source anchors do not need to be named, only destination anchors.
- [x] H7. "Unlink" doesn't seem to work. I think it would remove links from whatever span of text has been selected. 
- [ ] H7.5. If only part of a link was selected, it would truncate the anchor text to the non-selected part.
- [ ] H8. When saving and re-opening a document that was originally on a remote server, the window title becomes the remote URL; it should still be the document title picked up from `<TITLE>` markup (I checked that this was saved).
- [-] H9. ~~After saving a network document locally, links from there open empty files, probably because the base URL is lost. You can use the `<BASE>` tag to keep those relative links functional. Try it with the Newsgroups hierarchy page at http://info.cern.ch/hypertext/DataSources/News/Overview.html (a great use case to demo the Next/Previous/Up navigation) ~~_RS: can't do this because we're simulating in a browser, so adding `<BASE>` actually changes the entirety of the BASE for the **whole** application - i.e. the simulator then breaks_.


## Text editing

_RS: these are all notes about how `contenteditable` work so nothing I can (or want! since ce is silly hard!) do._

- [ ] T1. When typing Return, a paragraph break should be generated, not a line break. Thus the styling with separation of paragraphs would work as expected. Not sure what was supposed to happen when typing Return from a heading style, but I suppose it would switch to paragraph style.
- [ ] T2. Good that you let lists continue when typing Return from a list item. Then when backtracking from an empty bullet point, you seem to switch to regular paragraph, like Word does. I'm not sure it worked that way, rather it would remain in list context, and backtrack to end of the previous list item. To be tested on the emulator.
- [ ] T3. I have no recollection of how we wrote `<DL><DT><DD>` sequences on the NeXT. There must have been a way, because they are a frequent occurrence in all those documentation pages that were created and maintained with this editor! Probably a combination of picking a "definition list" style and tabbing to switch between the DT and the DD parts on the same line. To be tested on the emulator. I do remember that we would often copy a chunk of text from a page into another page, and then edit the contents, because that was faster than re-creating a hierarchy of headings, paragraphs, lists, etc. Just like most people do with word processors!
- [ ] T4. The saved markup has no line breaks. That makes it hard to read the source, and may create some issues when editing at the edges of each line. I suggest adding a line break after each closing paragraph, header or list tag.

## Misc extras

- [ ] M1. Keywords should keep reappearing, and stay open if "all other windows" are closed
- [x] M2. Keep layering correct
- [ ] M3. Keep menu selected if sub menu open
- [x] M4. Update user agent (https://www.metafilter.com/179514/Bringing-back-the-Web-of-1990#7643904)
- [ ] M5. Should prompt to replace an existing file
- [ ] M6. Emulate DOM0 😱