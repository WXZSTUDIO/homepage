/* ------------------------------------------------------------------
   GROQ — every query the site needs, in one file.

   All queries exclude drafts twice over: the client uses the
   `published` perspective, and `!(_id in path("drafts.**"))` guards
   against any client configured otherwise.
   ------------------------------------------------------------------ */

const PUBLISHED = '!(_id in path("drafts.**"))';

const IMAGE = `{
  alt,
  asset->{ _id, url, metadata { lqip, dimensions } }
}`;

const FILE_URL = `asset->{ url }`;

export const projectsQuery = `*[_type == "project" && ${PUBLISHED}] | order(coalesce(order, 999) asc, _updatedAt desc) {
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  year,
  category,
  group,
  brand,
  tag,
  description,
  coverType,
  coverImage ${IMAGE},
  "coverVideoFile": coverVideoFile{ ${FILE_URL } }.asset.url,
  coverVideoUrl,
  coverPoster ${IMAGE},
  coverAutoplay,
  coverLoop,
  coverMuted,
  likes,
  saves,
  order,
  mediaBlocks[] {
    _key,
    type,
    image ${IMAGE},
    gallery[] ${IMAGE},
    "videoFile": videoFile{ ${FILE_URL } }.asset.url,
    videoUrl,
    poster ${IMAGE},
    autoplay,
    loop,
    muted,
    caption,
    title,
    body,
    bullets
  }
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug && ${PUBLISHED}][0] {
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  year,
  category,
  group,
  brand,
  tag,
  description,
  coverType,
  coverImage ${IMAGE},
  "coverVideoFile": coverVideoFile{ ${FILE_URL } }.asset.url,
  coverVideoUrl,
  coverPoster ${IMAGE},
  coverAutoplay,
  coverLoop,
  coverMuted,
  likes,
  saves,
  order,
  mediaBlocks[] {
    _key,
    type,
    image ${IMAGE},
    gallery[] ${IMAGE},
    "videoFile": videoFile{ ${FILE_URL } }.asset.url,
    videoUrl,
    poster ${IMAGE},
    autoplay,
    loop,
    muted,
    caption,
    title,
    body,
    bullets
  }
}`;

export const resumeQuery = `{
  "profile": *[_type == "resumeProfile" && ${PUBLISHED}][0] {
    name,
    role,
    avatar ${IMAGE},
    bio,
    location,
    email,
    phone,
    "resumeFile": resumeFile{ ${FILE_URL } }.asset.url
  },
  "metrics": *[_type == "metric" && ${PUBLISHED}] | order(coalesce(order, 999) asc) {
    _id, value, suffix, unit, sub, order
  },
  "experiences": *[_type == "experience" && ${PUBLISHED}] | order(coalesce(order, 999) asc) {
    _id, company, role, start, end, current, description, order
  },
  "educations": *[_type == "resumeEntry" && kind == "education" && ${PUBLISHED}] | order(coalesce(order, 999) asc) {
    _id, title, subtitle, meta, description, order
  },
  "awards": *[_type == "resumeEntry" && kind == "award" && ${PUBLISHED}] | order(coalesce(order, 999) asc) {
    _id, title, subtitle, meta, description, order
  },
  "exhibitions": *[_type == "resumeEntry" && kind == "exhibition" && ${PUBLISHED}] | order(coalesce(order, 999) asc) {
    _id, title, subtitle, meta, description, order
  },
  "services": *[_type == "resumeEntry" && kind == "service" && ${PUBLISHED}] | order(coalesce(order, 999) asc) {
    _id, title, subtitle, meta, description, order
  },
  "skills": *[_type == "resumeEntry" && kind == "skill" && ${PUBLISHED}] | order(coalesce(order, 999) asc) {
    _id, title, subtitle, meta, description, order
  },
  "clients": *[_type == "client" && ${PUBLISHED}] | order(coalesce(order, 999) asc) {
    _id, name, logo ${IMAGE}, order
  },
  "contacts": *[_type == "contactLink" && ${PUBLISHED}] | order(coalesce(order, 999) asc) {
    _id, platform, label, url, handle, order
  }
}`;

export const settingsQuery = `*[_type == "siteSettings" && ${PUBLISHED}][0] {
  siteName,
  heroHeadline1,
  heroHeadline2,
  heroNarrative,
  "heroVideoFile": heroVideoFile{ ${FILE_URL } }.asset.url,
  heroVideoUrl,
  seoTitle,
  seoDescription,
  shareImage ${IMAGE},
  footerCopyright,
  footerLocation,
  contactEmail,
  contactPhone,
  contactWechat,
  "resumeFileUrl": resumeFile{ ${FILE_URL } }.asset.url,
  socials[] { _key, platform, label, url, handle },
  backgroundMusic {
    "audioFile": audioFile{ ${FILE_URL } }.asset.url,
    audioUrl,
    name,
    enabled,
    loop,
    volume
  }
}`;
