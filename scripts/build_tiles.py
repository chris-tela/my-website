import numpy as np, sys
from PIL import Image
from scipy import ndimage
D="C:/Users/telac/Desktop/Gen3 Outdoor Tilesets/"
OUT="C:/Users/telac/repos/my-website/public/tiles/"
pew=np.array(Image.open(D+"323.0 - ditto209 - Pewter City Tileset (Updated) by ditto209 on DeviantArt.png").convert('RGBA'))
road=np.array(Image.open(D+"173.0 - J-Treecko252 - Path Tiles EX Stone Road Grass.png").convert('RGBA'))
def cut(im,x,y,w,h,clear=True):
    c=im[y:y+h,x:x+w].copy()
    if clear:
        white=np.all(c[...,:3]==255,axis=2)
        lab,n=ndimage.label(white)
        edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
        c[np.isin(lab,list(edge)),3]=0
    return c
# buildings
B={'hobbies':(0,384,192,128),'projects':(0,512,224,256),'contact':(0,784,160,144),
   'work':(0,928,224,160),'resume':(0,1088,128,128),'about':(0,1216,160,128)}
for k,v in B.items():
    c=cut(pew,*v)
    if k=='projects': c[186:,160:,3]=0  # drop the stone arch beside the museum
    Image.fromarray(c).save(OUT+k+'.png')
A=np.zeros((12*16,16*16,4),np.uint8)
def put(c,tx,ty): A[ty*16:ty*16+c.shape[0],tx*16:tx*16+c.shape[1]]=c
r=cut(road,0,0,96,96,False)
g=np.all(r[...,:3]==[112,200,160],axis=2); r[g,:3]=[73,188,114]
put(r,0,0)
put(cut(pew,0,0,64,32,False),6,0)
put(cut(pew,224,32,32,32),6,2)   # bush
put(cut(pew,224,0,32,32),8,2)    # flowering bush
put(cut(pew,224,64,32,32),10,2)  # tips sign
put(cut(pew,192,96,32,32),6,4)   # flowers
put(cut(pew,224,96,32,32),8,4)   # wooden sign
put(cut(pew,160,0,64,96),12,0)   # pine
t=cut(pew,0,32,96,96); t[np.all(t[...,:3]==255,axis=2),3]=0; put(t,0,6)  # big tree
Image.fromarray(A).save(OUT+'atlas.png')
