---
layout: baselayout
title: Inside the Code — WorldWideWeb NeXT Application
subhede: A deconstruction of some of the more interesting bits we found hiding in the WorldWideWeb source code
---

<section>

## Introduction

The earliest (and only) <a href="https://github.com/cynthia/WorldWideWeb">source code</a> we could find for WorldWideWeb indicated it was version 0.15 (copyright 1991) in the <a href="https://github.com/cynthia/WorldWideWeb/blob/master/NextStep/Implementation/WorldWideWeb.nib/data.nib">data.nib</a> file. There were comments in the code with dates in 1992, however, so it's possible the version had not been updated and this code is a bit older. 

We weren't able to compile this code, but we did have access to a binary of WorldWideWeb which we were able to run on an original NeXT Computer provide by <a href="https://www.bolo.ch/">Mus&eacute;e Bolo</a>. It reported its version as "prerelease b of version 0.13", also copyright 1991. We mostly cross referenced this application's functionality with the code mentioned above. 

We also had access to a binary of Nexus, version 2.02 based on libwww, with a copyright date of 1994. At times, we ran this version to determine if certain oddities&mdash;we don't want to call them bugs!&mdash;were ever resolved and to understand how functionality changed over time. 

For all of the following comments, the terms "source code", "WorldWideWeb", and "Nexus" refer to the three things above. 

## Hypertext

Today, we refer to HTML files as HTML documents or web pages, but at the beginning of the Web, the source code only refers to hypertext documents or nodes&mdash;or "a hypertext" for short. 

When this source code was written, there was no version number associated with HTML. Based on the source code, the following tags&mdash;the term 'element' was not yet used&mdash;were recognized:

- ADDRESS
- A
- DL, DT, DD
- H1, H2, H3, H4, H5, H6
- HP1, HP2, HP3
- ISINDEX
- LI
- LISTING
- NEXTID
- NODE
- OL
- PLAINTEXT
- PRE
- RESTOFFILE
- TITLE
- UL
- XMP

Unrecognized tags were considered junk and ignored. Most of these tags will be familiar to modern web programmers, however a few are likely to be new:

- HP1, HP2, and HP3: "Highlighted phrase" is a carry over from SGML, which is used to allow some text to stand out from any surrounding text in some way. (You could say that they're the precursors to B/STRONG and I/EM.) HP1 is intended to be styled in italic text, HP2 in bold, and HP3 in both italic and bold. While the tags were successfully parsed by both WorldWideWeb and Nexus, the code to apply these styles was incomplete, so the content only displayed as normal text. 

- NODE: Nothing in a document with a NODE tag would get rendered to screen&mdash;and WorldWideWeb would crash if you tried to click in the page! The comment associated with the source code reads:<pre><code>
/* Subnodes are delimited by &lt;NODE&gt;...&lt;/NODE&gt;. They have the same address as the
** node, but the anchor IDs must be different. This is not thought out.	@@
** Perhaps a hierarchical anchor ID format ....
*/
case S_tag_n:
    switch(c) {
    case 'o':
    case 'O':	if (check("ODE&gt;")) {	/* Load a subnode */
		    if(TRACE)  printf("Loading subnode...NOT IMPLEMENTED\n");</code></pre>

- PLAINTEXT: It's likely this element was meant to be used at the top of a file, to indicate the rest of the file was in plain text. If it were used within an HTML file, none of the content before the PLAINTEXT tag would be displayed&mdash;only the content after it. (And no further markup would be parsed&mdash;including any closing PLAINTEXT tag.)

- RESTOFFILE: In WorldWideWeb, any content or markup appearing after the opening tag would be ignored (not rendered to screen). This tag may have been removed later, as the tag is ignored in Nexus and all content and markup appearing after the opening tag is rendered to screen. 

A few entities were supported: ampersand (<code>&amp;AMP;</code>), less than (<code>&amp;LT;</code>), greater than (<code>&amp;GT;</code>), quote (<code>&amp;QUOT;</code>).


### ParseHTML

ParseHTML.h in the source code contained the instructions for parsing markup. Here are some interesting things that we noticed: 

The approach taken to parsing the markup looked much like the code we found in www.c in the <a href="http://line-mode.cern.ch">line mode browser</a>. A state machine is used to parse the markup stream&mdash;in fact, the function names are the same and switch statements are very similar code. And again, this parsing also manages the style stack.

Comments in the code indicated that CERN's SGML implementation injected extra new line characters in files. The source code defines a constant called CERN_WEIRDO – when this is true, logic executes to identify multiple new line characters and replace them with a single paragraph tag/output.

</section>

<section>

![WorldWideWeb about screen and first web page](/images/screenshots/next_screenshot_02.png)

## Styling 

The concept of style sheets existed in these earliest applications, however they didn't look like the CSS we know today. We read through the style files and the application code to figure out how all of this worked, then we created test HTML files to load in WorldWideWeb and Nexus to validate our assumptions. 

WorldWideWeb and Nexus shipped with four style sheets: default, compact, project, and paper. Default was loaded at start up, compact used smaller indentations, project used larger fonts, and paper used serif fonts. In WorldWideWeb, the style panel presented options that made it look like a user could edit and create style sheets, however this functionality did not work and was removed in Nexus. That said, if you knew how to copy one of these style sheets and edit it, you could create your own style sheet and load it in the browser.

Here is a sample from the <a href="https://github.com/cynthia/WorldWideWeb/blob/master/NextStep/Implementation/WorldWideWeb.app/default.style">default style sheet</a>, defining the normal text style, followed by a line-by-line explanation:
<pre><code>
Normal &lt;P&gt; 0 Helvetica 12.0   1
	90 90	14.0 3.0  0  0 14	0</code></pre>

- On the first line:
  - "Normal" is the style name
  - &lt;P&gt; is the tag to which the style would apply
  - 0 is the tag type (purpose unknown)
  - "Helvetica" is the font
  - 12.0 is the font size
  - 1 indicates the NXTextStyle

- On the second line:
  - 90 = first indent level
  - 90 = second indent level
  - 14.0 = line height
  - 3.0 = descent line
  - 0 = alignment (0 for left align, 1 for right align, and 2 for center)
  - 0 = space before
  - 14 = space after
  - 0 = number of tab stops

The browsers expected 15 styles to be defined. In addition to Normal, the style names expected were: Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Glossary, List, Address, Example, Listing, Italic, Bold, and Bold-Italic. Here are the styles for Bold-Italic and List:
<pre><code>
Bold-Italic &lt;HP3&gt; 0	Helvetica-Bold-Oblique 12.0	0

List &lt;LI&gt; 0 Helvetica 12.0   1
        100 130	14 3  0  0 14  2
	0 130	0 300</code></pre>

In comparing the NXTextStyle values of 1 for Normal and List against the 0 for Bold-Italic, our hypothesis is that the former was intended to imply a block treatment while the latter was meant to imply inline treatment. This is supported by the fact that Bold-Italic lacks the second line of styles (indentation, spacing, tab stops) which would only be needed for blocks of text. 

Although there are values set to define the amount of space before and after blocks&mdash;similar to margins in CSS today&mdash;these values are not directly used to insert space. Instead, the browser performs some math to determine how many line breaks to insert between blocks of text. 
<pre><code>
int newlines = ((s-&gt;<b>spaceBefore</b>+s-&gt;<b>spaceAfter</b>) / s-&gt;paragraph-&gt;<b>lineHt</b>) + 1;
for(i=0; i&lt;newlines; i++) OUTPUT('\n');</code></pre>

Note that the List style does not define the list style indicator (bullet, number, etc.), as we do in CSS today. Instead, list styles are added by ParseHTML.h. Code in that file looks for <code>\n&lt;UL&gt;\n&lt;LI&gt;</code> to start a list, then <code>\n&lt;LI&gt;</code> to break up list items. It also specifies the starting text (<code>\267\t</code> – a dot then a tab character) which is added to each list item. So the indents of 100 pixels and 130 pixels in the styles are essentially tab stops for the dot and then for the text. 

Our version of WorldWideWeb was missing code to apply styles to H4, H5, or H6, however by the time of Nexus, that code had been added. Likewise, PRE and FIXED appeared like normal text in WorldWideWeb but were correctly styled in Nexus. (FIXED was in the source code but the tag wasn't parsed&mdash;it was only associated with styling.)

## Other Interesting Notes

### Printing
These days, we don't spend a lot of time thinking about printing web documents&mdash;but this was a consideration at the time. The code even considered that the pages might be ring-bound after printing!

<pre><code>
static NXDefaultsVector myDefaults = {
   { "PaperType", "Letter"},		// Non-USA users will have to override
   { "LeftMargin", "72"},		//  (72) Space for ring binding</code></pre>

### HTTP Ports
In HTUtils.h, we can see that <a href="https://en.wikipedia.org/wiki/Jon_Postel">Jon Postel</a> allocated port 80 to HTTP on 24 January 1992. 

<pre><code>
#define TCP_PORT 80	/* Allocated to http by Jon Postel/ISI 24-Jan-92 */
#define OLD_TCP_PORT 2784	/* Try the old one if no answer on 80 */</code></pre>

</section>