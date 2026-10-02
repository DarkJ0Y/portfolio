# Sudipto Sarkar Joy — Portfolio

Personal portfolio: [sudiptojoy.apeiroworld.com](https://sudiptojoy.apeiroworld.com)

A static, single-page site with 3D interactions:

- **Scroll flythrough**: a three.js camera flies through a purple star tunnel as you scroll
- **Isometric workspace**: a CSS-3D desk, monitor, robot and hovering drone that follow the cursor
- **Skill sphere**: drag-to-spin 3D tag cloud, filterable by category
- **3D timeline**: education, experience and leadership cards that swing in from depth
- **Research**: animated EEG → video thesis visual and flip cards for publications
- **Projects**: rotating featured-project cube, plus tilt cards whose layers separate on hover
- **Awards**: draggable 3D orbit carousel
- **Orbit navigation**: section rail on the right and a 3D tile menu on mobile

## Editing content

All text lives in [`javascript/data.js`](javascript/data.js) (projects, publications, timeline, awards, skills).
Edit it and refresh. No build step is needed.

## Structure

```
index.html            page markup
index.php             serves index.html on the PHP host
css/style.css         styles (accent #8D72E1)
javascript/data.js    content from the CV
javascript/main.js    3D scenes and interactions
assets/               downloadable CV
img/                  photos
php/project.html      redirect from the old projects URL
```
