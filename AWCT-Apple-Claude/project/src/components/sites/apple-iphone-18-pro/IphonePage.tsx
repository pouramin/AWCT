import type { PageContent } from "./content/en";
import { Footer } from "./Footer";
import { GlobalNav } from "./GlobalNav";
import { LocalNav } from "./LocalNav";
import { LocaleBanner } from "./LocaleBanner";
import { Ribbon } from "./Ribbon";
import { Accessories } from "./sections/Accessories";
import { Battery } from "./sections/Battery";
import { Camera } from "./sections/Camera";
import { Compare } from "./sections/Compare";
import { Design } from "./sections/Design";
import { Family } from "./sections/Family";
import { Hero } from "./sections/Hero";
import { Highlights } from "./sections/Highlights";
import { Incentive } from "./sections/Incentive";
import { IphoneIndex } from "./sections/IphoneIndex";
import { MostWanted } from "./sections/MostWanted";
import { Performance } from "./sections/Performance";
import { ProVideo } from "./sections/ProVideo";
import { Upgrader } from "./sections/Upgrader";
import { Values } from "./sections/Values";

/** apple.com/iphone-18-pro rebuilt section by section; `content` selects the locale. */
export function IphonePage({ content }: { content: PageContent }) {
  return (
    <>
      <LocaleBanner content={content} />
      <GlobalNav content={content} />
      <Ribbon content={content} />
      <div>
        <LocalNav content={content} />
        <main>
          <Hero content={content} />
          <Highlights content={content} />
          <MostWanted content={content} />
          <Design content={content} />
          <Camera content={content} />
          <ProVideo content={content} />
          <Battery content={content} />
          <Performance content={content} />
          <Upgrader content={content} />
          <Family content={content} />
          <Accessories content={content} />
          <Incentive content={content} />
          <Compare content={content} />
          <Values content={content} />
          <IphoneIndex content={content} />
        </main>
        <Footer content={content} />
      </div>
    </>
  );
}
