import React, { Component } from 'react';
import { connect } from 'react-redux';
import TweenMax from 'gsap';
import Point from '../lib/Point';

const PIXI = require('pixi.js');

function mapStateToProps({ appReducer }) {
  return { appReady: appReducer.appReady };
}

@connect(mapStateToProps)
export default class Circles extends Component {
  static propTypes = {};

  static COLS = 20;
  static PADDING = 100;

  componentDidMount() {
    this.circles = [];
    this.mousePos = new PIXI.Point();
    this.maxDistance = 0;
    this.introProgressBlack = 0;
    this.introProgressWhite = 0;
    this.prepPixi();
    this.onResize();
    this.update();

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);

    TweenMax.to(this, 2, {
      introProgressBlack: 1,
    });
    TweenMax.to(this, 2, {
      introProgressWhite: 1,
      delay: 1,
    });
  }

  onMouseMove = (event) => {
    TweenMax.to(this.mousePos, 1, {
      x: event.clientX,
      y: event.clientY,
    });
  };

  onResize = () => {
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.pixiRenderer.resize(this.winWidth, this.winHeight);
    this.maxDistance = Point.distance({ x: this.winWidth, y: this.winHeight });
    this.circleGridSize = (window.innerWidth - (Circles.PADDING * 2)) / Circles.COLS;
    this.createCircles();
    this.drawCircles();
  };

  drawCircles = () => {
    const circleSize = this.circleGridSize * 0.8;
    const totalHeight = (Math.floor(this.circles.length / Circles.COLS) * this.circleGridSize);
    const centerPos = { x: this.winWidth / 2, y: this.winHeight / 2 };
    const centerDistance = Point.distance(centerPos, { x: 0, y: 0 });

    const offsetPosition = {
      x: Circles.PADDING + (this.circleGridSize / 2),
      y: ((this.winHeight - totalHeight) / 2) + (this.circleGridSize / 2),
    };

    for (let i = 0; i < this.circles.length; i += 1) {
      const circle = this.circles[i];
      circle.container.x = ((i % Circles.COLS) * this.circleGridSize) + offsetPosition.x;
      circle.container.y = (Math.floor(i / Circles.COLS) * this.circleGridSize) + offsetPosition.y;

      const distance = Point.distance(this.mousePos, circle.container);
      const centerPointDistance = Point.distance(centerPos, circle.container);
      const centerRatio = centerPointDistance / centerDistance;

      if (!circle.started) {
        TweenMax.to(circle, 1, {
          introFrontProgress: 1,
          delay: 1 * centerRatio,
        });
        TweenMax.to(circle, 1, {
          introBackProgress: 1,
          delay: (1 * centerRatio) + 0.5,
        });
        circle.started = true;
      }

      circle.background.width = circleSize * circle.introFrontProgress;
      circle.background.height = circleSize * circle.introFrontProgress;

      const minRatio = Math.max(0.1, distance / this.maxDistance);
      const ratio = Math.min(0.6, minRatio) * circle.introBackProgress;
      circle.foreground.width = circleSize * ratio;
      circle.foreground.height = circleSize * ratio;
    }
  };

  prepPixi = () => {
    this.pixiRenderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      transparent: true,
      autoResize: true,
      resolution: window.devicePixelRatio || 1,
      antialias: true,
    });
    this.pixiRef.appendChild(this.pixiRenderer.view);
    this.circlesContainer = new PIXI.Graphics();
    this.stage = new PIXI.Container(0xFFF, true);
    this.stage.addChild(this.circlesContainer);
  };

  createCircles = () => {
    const rows = Math.floor((window.innerHeight - (Circles.PADDING * 2)) / this.circleGridSize);
    const totalCircles = Circles.COLS * rows;

    this.circlesContainer.removeChildren();
    this.circles = [];

    for (let i = 0; i < totalCircles; i += 1) {
      const background = new PIXI.Graphics();
      background.beginFill(0x000000);
      background.drawCircle(0, 0, 100);
      background.endFill();

      const foreground = new PIXI.Graphics();
      foreground.beginFill(0xFFFFFF);
      foreground.drawCircle(0, 0, 100);
      foreground.endFill();

      const container = new PIXI.Sprite();
      container.addChild(background);
      container.addChild(foreground);

      const circle = {
        background,
        foreground,
        container,
        introFrontProgress: 0,
        introBackProgress: 0,
        started: false,
      };

      this.circlesContainer.addChild(circle.container);
      this.circles.push(circle);
    }
  };

  update = () => {
    this.drawCircles();
    this.pixiRenderer.render(this.stage);
    this.raf = window.requestAnimationFrame(this.update);
  }

  render() {
    return <div className="canvas" ref={(ref) => { this.pixiRef = ref; }} />;
  }
}
