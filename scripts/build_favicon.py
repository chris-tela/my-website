# Draws the favicon: the player character's head and shoulders, in the same
# pixels and colours as the in-game sprite (src/town/art.js, drawPlayer),
# then scales it (nearest neighbour) to every size the site uses.
from PIL import Image, ImageColor
OUT = "public/"
SKIN, HAIR, HOOD, HOOD_D, EYE = "#F8D0A8", "#40302C", "#7050C8", "#503898", "#283048"
INK, GRASS = "#383848", "#49BC72"
W, H = 16, 18
px = {}
def r(x, y, w, h, c):
    for yy in range(y, y + h):
        for xx in range(x, x + w):
            px[(xx, yy)] = c
# facing down, same calls as drawPlayer
r(4, 10, 8, 6, HOOD); r(3, 10, 1, 4, HOOD_D); r(12, 10, 1, 4, HOOD_D)
r(3, 0, 10, 1, HAIR); r(2, 1, 12, 5, HAIR)
r(6, 13, 4, 2, HOOD_D)
r(2, 6, 1, 2, SKIN); r(13, 6, 1, 2, SKIN)
r(3, 5, 10, 4, SKIN); r(4, 9, 8, 1, SKIN)
r(3, 5, 10, 1, HAIR); r(3, 6, 2, 1, HAIR); r(11, 6, 2, 1, HAIR)
r(5, 7, 1, 2, EYE); r(10, 7, 1, 2, EYE)
# 1px outline around the sprite, like the game's outlined()
sprite = Image.new("RGBA", (W + 2, H + 2))
for (x, y), c in px.items():
    for dx, dy in ((0, 1), (2, 1), (1, 0), (1, 2)):
        if (x + dx - 1, y + dy - 1) not in px:
            sprite.putpixel((x + dx, y + dy), ImageColor.getrgb(INK))
for (x, y), c in px.items():
    sprite.putpixel((x + 1, y + 1), ImageColor.getrgb(c))
# head and shoulders, 16x16 (trim the bottom of the hoodie)
icon = sprite.crop((1, 0, 17, 16))
icon.save(OUT + "favicon-16x16.png")
icon.resize((32, 32), Image.NEAREST).save(OUT + "favicon-32x32.png")
icon.resize((48, 48), Image.NEAREST).save(OUT + "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
# Home-screen icons can't be transparent: put him on a grass-green tile.
for name, s in (("apple-touch-icon.png", 180), ("logo192.png", 192), ("logo512.png", 512)):
    bg = Image.new("RGBA", (s, s), GRASS)
    big = icon.resize((s * 3 // 4,) * 2, Image.NEAREST)
    bg.paste(big, (s // 8, s // 8 + s // 16), big)
    bg.save(OUT + name)
