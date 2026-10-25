/**
 * Local copies of the images and videos apple.com/iphone-18-pro loads.
 * Source → local mapping lives in docs/research/apple-iphone-18-pro/asset-map.json.
 */

const BASE = "/sites/apple-iphone-18-pro";

export type Pic = {
  /** Desktop/tablet rendition (`_large_2x`). */
  large: string;
  /** Mobile rendition (`_small_2x`) when apple.com ships a different crop. */
  small?: string;
  width: number;
  height: number;
};

export type Video = { large: string; small: string };

/**
 * @param stem path under images/ without the size suffix, e.g. "overview/aio/hero__elo7tt0mnqy6"
 * @param size intrinsic size of the large_2x file (used for aspect ratio)
 * @param small set when a distinct `_small_2x` crop exists
 */
function pic(stem: string, size: [number, number], small = false, ext = "jpg"): Pic {
  return {
    large: `${BASE}/images/${stem}_large_2x.${ext}`,
    small: small ? `${BASE}/images/${stem}_small_2x.${ext}` : undefined,
    width: size[0],
    height: size[1],
  };
}

const png = (stem: string, size: [number, number]) => pic(stem, size, false, "png");

function video(name: string): Video {
  return { large: `${BASE}/videos/${name}-large.mp4`, small: `${BASE}/videos/${name}-small.mp4` };
}

const W = [2880, 1520] as [number, number];
const TILE = [1392, 904] as [number, number];

export const media = {
  localNav: {
    "iphone-duo": png("site/localnav/iphone_duo__es1je56gg18i", [152, 132]),
    "iphone-18-pro": png("site/localnav/iphone_18_pro__ezuydx8yjcia", [74, 132]),
    "iphone-air": png("site/localnav/iphone_air__c7j8qnq4ftci", [74, 132]),
    "iphone-17": png("site/localnav/iphone_17__d1k2ss9gvkya", [72, 132]),
    "iphone-17e": png("site/localnav/iphone_17e__gd8egsmdhgey", [74, 132]),
    "iphone-16": png("site/localnav/iphone_16__dwi4y3l3amgm", [72, 132]),
    compare: png("site/localnav/compare__clhjrq5m2ymq", [128, 132]),
    accessories: png("site/localnav/accessories__eq6jc5t9202u", [154, 132]),
    shop: png("site/localnav/shop__fc6e3idzwtqq", [144, 132]),
    ios: png("site/localnav/ios__drrubh21s9yu", [106, 132]),
  } as Record<string, Pic>,

  hero: {
    start: pic("overview/media-hero/hero_startframe__ck15fj8f67hy", [2880, 2160], true),
    end: pic("overview/media-hero/hero_endframe__fbxsnz8txcia", [2880, 2160], true),
    video: video("hero"),
  },

  highlights: {
    camera: { end: pic("overview/highlights/main_camera_endframe__fcjfhs06rdme", [2520, 1224], true), video: video("highlights-camera") },
    battery: { end: pic("overview/highlights/battery_endframe__ds9p2a09r9aq", [2520, 1224], true), video: video("highlights-battery") },
    colors: { end: pic("overview/highlights/colors_endframe__czfie0zmty4i", [2520, 1224], true), video: video("highlights-colors") },
    chip: { end: pic("overview/highlights/chip_endframe__lhkymtfv1uie", [2520, 1224], true), video: video("highlights-chip") },
    siri: { end: pic("overview/highlights/siri__eprmtp3edh8i", [2520, 1224], true), video: null },
  } as Record<string, { end: Pic; video: Video | null }>,

  aioHero: pic("overview/aio/hero__elo7tt0mnqy6", [1496, 988], true),

  design: {
    burgundy: pic("overview/product-viewer/color_burgundy__f95it7a6dnyq", W, true),
    glacier: pic("overview/product-viewer/color_glacier__fkxlpbz0ruy6", W, true),
    silver: pic("overview/product-viewer/color_silver__c0oudn0fzw4m", W, true),
    black: pic("overview/product-viewer/color_black__dseo2tvypuc2", W, true),
    overview: pic("overview/product-viewer/3d_viewer__hgotqf9hvvee", W, true),
    sizes: pic("overview/product-viewer/size__ufk3tqa1f5e2", W, true),
    camera: pic("overview/product-viewer/viewer_aperture_endframe__2jpki8xah2au", W, true),
    island: pic("overview/product-viewer/dynamic_island_endframe__edszr68pgo66", W, true),
    durability: pic("overview/product-viewer/durability__gluy1en01nqm", W, true),
    "camera-control": pic("overview/product-viewer/camera_control__f4t7iottmvyy", W, true),
    action: pic("overview/product-viewer/action_button__f9p8n5h9xk66", W, true),
  } as Record<string, Pic>,
  designVideos: {
    camera: video("viewer-aperture"),
    island: video("viewer-dynamic-island"),
  } as Record<string, Video>,

  camera: {
    hero: pic("overview/pro-camera/system/hero__elo7tt0mnqy6", [2880, 1376], true),
    systemStart: pic("overview/pro-camera/system/camera_system_startframe__e0gisudnvv2a", [2880, 2160], true),
    systemVideo: video("camera-system"),
    aperture: {
      "max-light": pic("overview/pro-camera/aperture/max_light__dlmrw5m29ssy", [2100, 1224], true),
      balance: pic("overview/pro-camera/aperture/balance__dtrq8w3uj9iu", [2100, 1224], true),
      depth: pic("overview/pro-camera/aperture/depth__eqlqllrh0v8m", [2100, 1224], true),
      "max-depth": pic("overview/pro-camera/aperture/max_depth__chz65982bi4i", [2100, 1224], true),
    } as Record<string, Pic>,
    gallery: {
      "pro-controls": pic("overview/pro-camera/control/pro_controls__esrtcpjxy3qu", TILE, true),
      styles: pic("overview/pro-camera/control/photographic_styles__ef8cg39z0q2q", TILE, true),
      editing: pic("overview/pro-camera/control/intelligent__fud8ul5o3emy", TILE, true),
      focus: pic("overview/pro-camera/control/smart_focus__yrqfyzob1eqi", [744, 904]),
      zoom: pic("overview/pro-camera/control/8x-zoom_endframe__ed8psayfjwqe", TILE, true),
      "ultra-wide": pic("overview/pro-camera/control/ultra_wide__fuin4rf0dnyq", [744, 904]),
      "center-stage": pic("overview/pro-camera/control/center_stage__ecf4wpldlkcy", [744, 904]),
      reference: pic("overview/pro-camera/control/reference__dpo1xa7gsdea", [744, 904]),
    } as Record<string, Pic>,
    galleryVideos: { zoom: video("8x-zoom") } as Record<string, Video>,
  },

  video: {
    end: pic("overview/pro-video/pro_video_endframe__jo1bq7ocrka6", [2880, 1940], true),
    video: video("pro-video"),
    gallery: {
      "low-light": pic("overview/pro-video/low_light__b51d1dpc3xde", TILE, true),
      timelapse: pic("overview/pro-video/4k_timelapse_endframe__fpokzlb44wa6", TILE, true),
      "audio-mix": pic("overview/pro-video/audio_mix__cv5tvd3y13ee", [744, 904]),
      features: pic("overview/pro-video/features__16r2b47nrpe2", TILE, true),
      "dual-capture": pic("overview/pro-video/dual_capture__cwiaeus8h002", [744, 904]),
    } as Record<string, Pic>,
    galleryVideos: { timelapse: video("4k-timelapse") } as Record<string, Video>,
  },

  battery: {
    hero: pic("overview/battery/hero__elo7tt0mnqy6", [2528, 1228]),
    video: video("battery"),
    charge: png("overview/battery/charge__eiv9d90t9zue", [104, 162]),
  },

  performance: {
    chip: pic("overview/performance/chip_endframe__lhkymtfv1uie", [2880, 1416], true),
    video: video("performance"),
    iconAi: png("overview/performance/icon_ai__cdtqv8s8tm82", [102, 150]),
    iconA20: png("overview/performance/icon_a20__dhsqkelmytg2", [108, 150]),
    vapor: pic("overview/performance/vapor_chamber__dyn98zs14ryq", [2520, 886]),
  },

  upgrader: {
    camera: pic("overview/upgrader/main_camera__dcm72wfqflm6", [674, 390]),
    chip: pic("overview/upgrader/a20_pro_chip__c6rba3bxjuc2", [296, 296]),
    frontCamera: pic("overview/upgrader/front_camera__c533i0c3mh4y", [674, 390]),
    siri: png("overview/upgrader/siri_ai__ftge31f617iq", [124, 150]),
    tradeIn: png("overview/upgrader/trade_in__gkkv4yplrqi6", [296, 60]),
  },

  androidValues: {
    iphone: png("overview/android-values/iphone__cm8c5664gln6", [80, 112]),
    creditcard: png("overview/android-values/creditcard__9lzp09qkxv6u", [92, 112]),
    person: png("overview/android-values/person__cf417z3i1pg2", [102, 112]),
  } as Record<string, Pic>,
  moveToIos: pic("overview/ios/move_to_ios__czimkpt2niy6", [602, 860]),

  family: {
    hero: pic("overview/family/siri_ai_hero__b93zn5f7x4aa", [1410, 1312]),
    siri: {
      assistant: pic("overview/family/siri-ai/siri_ai_assistant__el1seyzgpv0i", TILE, true),
      "personal-context": pic("overview/family/siri-ai/personal_context__fu25x2c16ymy", [744, 904]),
      "app-actions": pic("overview/family/siri-ai/app_actions__budci8e25k76", [744, 904]),
      "world-knowledge": pic("overview/family/siri-ai/world_knowledge__gfbdm64gdrue", [744, 904]),
      "siri-app": pic("overview/family/siri-ai/siri_app__cv4mp1a9nxiu", TILE, true),
      "siri-mode": pic("overview/family/siri-ai/siri_mode__fi0ng1mrbvu6", [744, 904]),
      customize: pic("overview/family/siri-ai/customize__flxdw7wl0byq", [744, 904]),
      write: pic("overview/family/siri-ai/write__cskm66rylaky", TILE, true),
    } as Record<string, Pic>,
    intelligence: {
      "call-context": pic("overview/family/ios-apple-intelligence/call_context__bwokedkz7swi", TILE, true),
      "child-safety": pic("overview/family/ios-apple-intelligence/child_safety__ep2w0kpc93ee", [744, 904]),
      "clean-up": pic("overview/family/ios-apple-intelligence/clean_up__c4nkcvxq91me", TILE, true),
      "image-playground": pic("overview/family/ios-apple-intelligence/image_playground__do3eby1zbe82", TILE, true),
      suggestions: pic("overview/family/ios-apple-intelligence/suggestions__c87yzqqh490m", [744, 904]),
      "safari-tabs": pic("overview/family/ios-apple-intelligence/safari_tabs__d3zxf5gah3ue", [744, 904]),
      shortcuts: pic("overview/family/ios-apple-intelligence/shortcuts__fh00yn8sevqu", [744, 904]),
    } as Record<string, Pic>,
    connectivity: {
      esim: pic("overview/family/connectivity/esim__dybvr8oo5ro2", TILE, true),
      messages: pic("overview/family/connectivity/messages__e05v4dplbdea", TILE, true),
      roadside: pic("overview/family/connectivity/roadside__bqugdgosuzci", TILE, true),
      esos: pic("overview/family/connectivity/esos__8m299y5obzmq", [744, 904]),
      "crash-detection": pic("overview/family/connectivity/crash_detection__c458d3ugtcom", [744, 904]),
      "find-my": pic("overview/family/connectivity/find_my__epk4pm9szhci", [744, 904]),
    } as Record<string, Pic>,
  },

  accessories: pic("overview/accessories/accessories__eq6jc5t9202u", [1680, 1082]),

  incentive: {
    "apple-upgrade": pic("overview/incentive/apple_upgrade__dc9j71c0kuye", [744, 568], true),
    carrier: pic("overview/incentive/carrier__esb83lh15tsi", [744, 568], true),
    "trade-in": pic("overview/incentive/apple_trade_in__bxvpyn2q8tg2", [744, 568], true),
    "trade-in-android": pic("overview/incentive/trade_in_android__cz42ggstsd4y", [744, 568], true),
    "ways-to-buy": pic("overview/incentive/ways_to_buy__cuh31j07k0eq", [744, 568], true),
    "personal-setup": pic("overview/incentive/personal_setup__dq9kk8pi0ga6", [744, 568], true),
    delivery: pic("overview/incentive/deliver__dppu74mrffo2", [744, 568], true),
    "guided-shopping": pic("overview/incentive/guided_video_shopping__fpotxkh25ymq", [744, 568], true),
    "store-app": pic("overview/incentive/apple_store_app__b1iul1goe0mq", [744, 568], true),
    qr: png("overview/incentive/boc_qr_code__dl7xwwg834gi", [1632, 968]),
  } as Record<string, Pic>,

  contrast: {
    "iphone-18-pro": pic("overview/contrast/iphone_18_pro_alt__gcw09g1aoqie", [744, 668], true),
    "iphone-duo": pic("overview/contrast/iphone_duo__es1je56gg18i", [522, 668], true),
    battery: png("overview/contrast/battery__btf608ldbd0i", [92, 112]),
    chip: png("overview/contrast/chip_a20pro__eio38rrjn50m", [72, 112]),
    "camera-pro": png("overview/contrast/iphone_18_pro_camera__cr03lr3qm8cy", [80, 112]),
    "camera-duo": png("overview/contrast/iphone_duo_camera__e3kr0qjnx3o2", [86, 112]),
    "center-stage": png("overview/contrast/center_stage__ecf4wpldlkcy", [92, 112]),
    intelligence: png("overview/contrast/apple_intelligence__bj6vdt2qskmu", [84, 112]),
  } as Record<string, Pic>,

  environment: {
    recycling: png("overview/environment/icon_recycling__cbg6enserceu", [112, 112]),
    electricity: png("overview/environment/icon_electricity__fmrz4117o7ee", [112, 112]),
    package: png("overview/environment/icon_package__btqe87dkmr5y", [112, 112]),
  } as Record<string, Pic>,

  values: {
    environment: png("overview/values/icon_environment__bweedxdciqpe", [84, 112]),
    privacy: png("overview/values/icon_privacy__eej8prd13126", [112, 112]),
    accessibility: png("overview/values/icon_accessibility__ciyyk203pxsi", [112, 112]),
  } as Record<string, Pic>,
};
