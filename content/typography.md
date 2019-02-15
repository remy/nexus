---
layout: baselayout
title: Typography — WorldWideWeb NeXT Application
subhede: Notes on the faithful recreation of NeXT type
---

<figure class="fullbleed">
	<img src="/images/typography/wide-characters.png" style="width: 100%;"/>
</figure>

<section>

### NeXT Computer fonts

Much of the WorldWideWeb browser’s fonts and display were inherited from what was available on the system. This was a time before vector based fonts where each font-face was drawn as pixels at different font sizes. The system has 3 fonts available: Helvetica, Courier and another monospaced called Ohlfs. These were available in several different sizes and bold and oblique.

The default styles for the WorldWideWeb browser made use of Helvetica and Ohlfs at a few different sizes, bold and oblique. Ohlfs was created by Keith Ohlfs and was never replicated outside of the NeXT OS.

To make the experience as close as possible to the original browsers, we couldn’t use modern versions of these fonts. That’s because modern fonts are vector based and scale smoothly at any size. This made the experience feel much more polished than it was in 1989. We needed to create modern fonts that looked like they were bitmap fonts from the late 80s.

On the actual NeXT machine, we wrote out the alphabet in HTML in all the elements just so we could see all the different font variations and sizes. Using the “Grab.app” we took a screenshot and sent the tiff files back to our own machines to use modern tools to replicate the look.

We dutifully traced each square pixel in a vector program, which was imported into a font creation tool and exported in a format suitable for the web. The result was a modern vectorised 1989 bitmap looking font which completed the look of the emulation.

----

We did run into a few interesting anomalies between 1989 hardware and today. When we take a screenshot it renders the screen as a data file where each pixel is a square. When it is rendered on the NeXT CRT Megapixel monitor, the width of each pixel is actually wider than it is longer. A screenshot doesn’t capture this, it is an aspect of the hardware. The font we created is “correct” and if it were viewed on the NeXT machine it work look perfect, but pixels on our modern LCD monitors are square.
￼
The character set did not include a full Unicode set of characters. Many of the common accented characters were only available in uppercase.

</section>

<section>

![Helvetica Bold and Oblique on NeXT](/images/typography/helv-bold-and-oblique.png)

One issue we ran into is that the pixel size on the original NeXT monitors wasn't quite square. As an example, compare the following. This image is of the font on the NeXT monitor:  

![type example on monitor](/images/typography/breakinthe_blur.jpg)

This is as rendered on a contemporary machine: 
![type example as rendered](/images/typography/breakinthe.png)

And here's our finished character set:

![NeXT Font](/images/typography/characters.png)


</section>






