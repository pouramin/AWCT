import fs from 'node:fs/promises';
import sharp from 'sharp';
const dir='docs/research/apple/';
const g=JSON.parse(await fs.readFile(dir+'mobile-geometry.json','utf8'));
const matches=[['section-highlights','highlights'],['section-product-viewer','design'],['section-pro-camera','cameras'],['section-pro-video','pro-video'],['section-battery','battery'],['section-performance','performance'],['section-intro','shared-features'],['section-accessories','accessories']];
const layers=[];
for(let i=0;i<matches.length;i++){
 for(let kind=0;kind<2;kind++){
  const item=kind?g.local.find(x=>x.id===matches[i][1]):g.source.find(x=>x.key===matches[i][0]);
  const file=dir+(kind?'local':'source')+'-mobile-full.png';
  const top=Math.round(item.top);
  const input=await sharp(file).extract({left:0,top,width:375,height:Math.min(750,Math.floor(item.height))}).resize(187,375,{fit:'contain',background:'#000'}).toBuffer();
  layers.push({input,left:((i%2)*2+kind)*187,top:Math.floor(i/2)*400+25});
 }
}
await sharp({create:{width:748,height:1600,channels:3,background:'#202024'}}).composite(layers).png().toFile(dir+'comparison-mobile-sections.png');
