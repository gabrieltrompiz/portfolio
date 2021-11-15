<br />
<p align="center">
  Personal portfolio
</p>

## Table of Contents
* [About this project](#about-this-project)
* [Tech Stack](#tech-stack)
* [Screenshots](#screenshots)
* [Known Issues](#known-issues)

## About this project

I started this project at the beginning of 2021 to have a place to showcase my side projects and to explore new technologies while I developed it. I decided to give a try to Three.js and WebGL in this project and got a good grasp of the basics. At the same time it's my first project with Next.js. It's now live and can be visited at [gabrieltrompiz.com](https://gabrieltrompiz.com).

## Tech Stack
* React with TypeScript
* Next.js
* Redux
* Sass
* Three.js (using @react-three/fiber)
* Framer Motion

## Screenshots

<img width="1786" alt="Screen Shot 2021-11-14 at 10 13 18 PM" src="https://user-images.githubusercontent.com/39140902/141721347-f2064999-ebba-44db-889f-88c5126c0cf7.png">
<img width="1792" alt="Screen Shot 2021-11-14 at 10 13 29 PM" src="https://user-images.githubusercontent.com/39140902/141721350-da753304-36f6-4caa-a96f-18d3cbd933d4.png">
<img width="1792" alt="Screen Shot 2021-11-14 at 10 13 45 PM" src="https://user-images.githubusercontent.com/39140902/141721356-daa9944e-7a3e-4862-a237-e7f3b38ca5fa.png">
<img width="1792" alt="Screen Shot 2021-11-14 at 10 13 53 PM" src="https://user-images.githubusercontent.com/39140902/141721395-a36e4ddc-5aac-445f-8ee4-55fba76215b7.png">

## Known Issues
Apparently there is a problem with Safari 15 and WebGL 2 that causes the app to randomly crash if you are using iOS 15+ or MacOS Monterey. There are some workarounds but is actually a Safari regression and not a Three.js/WebGL one. I tried to reproduce it but only managed to do it on iOS and since the mobile version of the site is still in development, it's not a priority right now. 

Reference: [Safari v15 (on desktop) -> threejs bug #22582](https://github.com/mrdoob/three.js/issues/22582).
