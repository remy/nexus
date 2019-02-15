---
layout: baselayout
title: Inside the Code — WorldWideWeb NeXT Application
subhede: 
---

<section>

### Versions
- The source code version we have says it's version 0.15 with a date of 1991... but comments in the code have dates towards the end of 1992.
- The binary of WorldWideWeb that we have is prerelease b of version 0.13.
- The binary of Nexus that we have is 2.02.


### ParseHTML

ParseHTML.h contains much of the same code we spent time analysing last time, related to (duh) parsing markup.  Here are some interesting things that stick out: 
- Yet again, a state machine is used to parse the markup stream. The function names and switch statements look much like they did in the LMB code. And again, this parsing is done to manage the style stack.
- CERN's SGML implementation injected extra new line characters. There was a constant called CERN_WEIRDO – when this is true, logic executes to identify multiple new line characters and replace them with a single paragraph tag/output. (To output a paragraph, math was done using the styles to determine how many newlines to add to the window.)


<pre>
int newlines = ((s-&gt;spaceBefore+s-&gt;spaceAfter) / s->paragraph-&gt;lineHt) + 1;
for(i=0; i&lt;newlines; i++) OUTPUT('\n');
</pre>

- Tags supported (as in parsed): ADDRESS, A, DL, DT, DD, H1, H2, H3, H4, H5, H6, HP1, HP2, HP3, ISINDEX, LI, LISTING, NEXTID, NODE, OL, PLAINTEXT, PRE, RESTOFFILE, TITLE, UL, XMP.
- Entities detected: ampersand (&amp;AMP;), less than (&amp;LT;), greater than (&amp;GT;), quote (&amp;QUOT;).
- Subnodes are an incomplete concept in the code:

<pre>
/* Subnodes are delimited by &lt;NODE&gt;...&lt;/NODE&gt;. They have the same address as the
** node, but the anchor IDs must be different. This is not thought out.	@@
** Perhaps a hierarchical anchor ID format ....
*/
	case S_tag_n:
	    switch(c) {
	    case 'o':
	    case 'O':	if (check("ODE&gt;")) {	/* Load a subnode */
			    if(TRACE)  printf("Loading subnode...NOT IMPLEMENTED\n");
</pre>



</section>

<section>

![WorldWideWeb about screen and first web page](/images/screenshots/next_screenshot_02.png)

### Style sheet definition/parsing

We read through the style files and the application code to figure out how all of this worked, then we created test HTML files to load in WorldWideWeb (and Nexus) to validate our assumptions. 

Interestingly, the version of WorldWideWeb that we had (prerelease b of version 0.13) didn't have a complete set of code for rendering styles – even with a complete style sheet, it wasn't able to parse H4, H5, and H6. We had to use Nexus (v 2.02) to see what these tags looked like.

**SAMPLE:**
<pre>
Normal &lt;P&gt; 0 Helvetica 12.0   1
	90 90	14.0 3.0  0  0 14	0
</pre>

- First line:
  - "Normal" is the style name
  - &lt;P&gt; is the tag to which the style applies
  - 0 is the tag type (doesn't appear to be used, is always 0)
  - "Helvetica" is the font
  - 12.0 is the font size (in points)
  - 1 indicates the NXTextStyle, which appears to translate into an element being treated as a block. (Italic, bold, and bold-italic – HP1, HP2, and HP3 – all have a value of 0 and are inline.)
- Second line:
  - 90 = 1st indent level (in pixels)
  - 90 = 2nd indent level (in pixels – you'll see why second level exists shortly)
  - 14.0 = line height (in points?)
  - 3.0 = descent line (in points?)
  - 0 = alignment (0 = left align, 1 = right align, 2 = center)
  - 0 = space before
  - 14 = space after (in points?)
  - 0 = number of tab stops

<pre>
Bold-Italic &lt;HP3&gt; 0	Helvetic-Bold-Oblique 12.0	0

List &lt;LI&gt; 0 Helvetica 12.0   1
        100 130	14 3  0  0 14  2
	0 130	0 300
</pre>

- Bold-Italic is inline, and so it doesn't have a second line of styles, defining space around the block
- List styles are applied when a list is found in the markup. ParseHTML.h looks for "\n&lt;UL&gt;\n&lt;LI&gt;" to start a list, then "\n&lt;LI&gt;" to break up list items. ParseHTML.h specifies that starting text ("\267\t" – a dot then a tab character) be added to each list item. So the indents of 100 pixels and 130 pixels would first be for the bullet point (dot) and then for the placement of the text. 
- List allows for two tab stops at 130 pixels and 300 pixels. (Mark is testing this)


### Printing
<pre>
void main(int argc, char *argv[])
{
//    NXArgc = argc;        /
//    NXArgv = argv;        /

char *p;

static NXDefaultsVector myDefaults = {
{ "PaperType", "Letter"},        // Non-USA users will have to ove
{ "LeftMargin", "72"},            //  (72) Space for ring

</pre>

### HTTP Ports
<pre>
#define TCP_PORT 80    / Allocated to http by Jon Postel/ISI 24-
#define OLD_TCP_PORT 2784    / Try the old one if no answer on 8
</pre>


</section>