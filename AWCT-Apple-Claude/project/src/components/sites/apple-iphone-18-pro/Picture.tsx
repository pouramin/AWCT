import type { Pic } from "./media";

type PictureProps = {
  pic: Pic;
  alt?: string;
  className?: string;
  imgClassName?: string;
  /** Hero images load eagerly; everything else is lazy like apple.com. */
  priority?: boolean;
};

/**
 * apple.com serves `_large_2x` above 734px and `_small_2x` (a different crop) below.
 * Plain <picture> keeps the art-direction switch without an image optimizer.
 */
export function Picture({ pic, alt = "", className, imgClassName, priority = false }: PictureProps) {
  return (
    <picture className={className}>
      {pic.small ? <source media="(max-width: 734px)" srcSet={pic.small} /> : null}
      <img
        src={pic.large}
        alt={alt}
        width={pic.width}
        height={pic.height}
        className={imgClassName}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}
