import React, { Component, Fragment } from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { Scrollbars } from "react-custom-scrollbars";
import easy from "./easy.json";
import normal from "./normal.json";
import hard from "./hard.json";
import music from "./acer-demo3.m4a";
import RoundBtn from "../RoundBtn";
import tip from "./tip.mp4";
import tipM from "./tip-m.mp4";
// import { THREE } from "three";
// import { THREE } from "three/build/three.modules";
import { Scene, PerspectiveCamera, WebGLRenderer, HemisphereLight, PlaneGeometry, MeshBasicMaterial, MeshLambertMaterial, SphereGeometry, Mesh, RingGeometry, Texture, CylinderGeometry, CircleGeometry, Group, Raycaster, Vector2, Vector3, Geometry, PointsMaterial, Points } from "three";
import "./index.scss";

class RhythmGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            combo: 0,
            totalPoint: 0,
            isPlaying: false,
            start: false
        };
        this.musicGame = null;
        this.bpm = 113;
        this.ticker = null;
        switch (this.props.level) {
            case "1":
                this.score = easy;
                break;
            case "2":
                this.score = normal;
                break;
            case "3":
                this.score = hard;
                break;
        }
        // this.ExplodeAnimation = this.ExplodeAnimation.bind(this);
    }
    componentDidMount() {
        this.MusicGame();
    }
    componentWillUnmount() {
        this.audio.pause();
        cancelAnimationFrame(this.ticker);
        this.scene = null;
        this.renderer = null;
        this.camera = null;
        window.removeEventListener("resize", this.resize);
        document.getElementById("game").removeEventListener("touchstart", this.touchEvent);
        document.getElementById("game").removeEventListener("touchend", this.touchEvent);
        window.removeEventListener("keydown", this.keyDownEvent);
        window.removeEventListener("keyup", this.keyUpEvent);
    }
    MusicGame = () => {
        this.showExplode = true; //是否啟用粒子
        this.showCamera = false; //是否啟用鏡頭移動
        this.screenHeight = 1200; //遊戲螢幕高度
        this.scoreSpeed = 1; //遊戲速度：預設1
        this.scoreBottom = 300; //按鈕中心點離bottom距離
        this.trackBetween = 80; //每軌間距

        var _this = this;

        // this.bpm = setting.bpm;
        this.songLength = this.score.length;
        this.currTime = [0, 0]; //以拍子為計算的時間 (n小節,n拍)
        this.currRealTime = 0; //真實時間 (s)

        this.audio = document.createElement("audio");
        this.audio.setAttribute("preload", true);
        this.audio.setAttribute("loop", false);
        this.audio.setAttribute("autoplay", true);
        this.audio.setAttribute("muted", true);
        this.audio.muted = true;
        // console.log(this.audio.muted);
        this.source = document.createElement("source");
        this.source.setAttribute("src", music);
        this.source.setAttribute("type", "audio/mpeg");
        this.audio.appendChild(this.source);

        this.totalPoint = 0;
        this.noteColors = [0x00e7c2, 0xfdfc02, 0xfe3b3b, 0x00f80e, 0x02a0ea];
        this.notes = [];
        this.isPlaying = false;
        this.scoreMovePerSec = _this.bpm * this.screenHeight * this.scoreSpeed / 240; // 譜面每秒移動距離(pixel/s)

        this.explodes = []; //粒子動畫們

        //init
        // threejsSetup();

        // threejs場景建置
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({ canvas: document.getElementById("game"), alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight - 60);

        this.noteContainer = new Group();
        this.scene.add(this.noteContainer);
        this.noteContainer.position.set(0, 0, 300); //原點

        // $("#game").css({
        // 	width: '100%',
        // 	height: '100%'
        // });

        window.addEventListener("resize", this.resize);

        // $(window).on("resize",function(){
        // 	renderer.setSize( window.innerWidth, window.innerHeight );
        // 	$("#game").css({
        // 		width: '100%',
        // 		height: '100%'
        // 	});
        // 	this.camera.aspect = window.innerWidth / window.innerHeight;
        // 	this.camera.updateProjectionMatrix();
        // })

        this.camera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, this.screenHeight);
        this.camera.position.set(0, 122, 450);
        this.camera.rotation.set(-0.24, 0, 0);

        var light = new HemisphereLight(0xffffff, 0x999999, 1);
        this.scene.add(light);

        // Helpers
        // helper = new GridHelper(1000, 10);
        // this.scene.add(helper);

        // controls
        if (this.showCamera) {
            controls = new OrbitControls(this.camera);
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
        }
        this.camera.position.set(0, 130, 478);
        this.camera.rotation.set(-0.26, 0, 0);

        //line
        var geometry = new PlaneGeometry(2, this.screenHeight, 16);
        var material = new MeshBasicMaterial({ color: 0x000000, opacity: 0.3 });
        var line = new Mesh(geometry, material);

        this.scene.add(line);
        line.rotation.x = -Math.PI / 2;
        line.position.z = 300 - this.screenHeight / 2;
        line.position.y = -20;
        line.position.x = -this.trackBetween;

        var line2 = line.clone();
        this.scene.add(line2);
        line2.position.x = 0;

        var line3 = line.clone();
        this.scene.add(line3);
        line3.position.x = this.trackBetween;

        //hit
        var geometry = new RingGeometry(25, 26, 32, 1);
        var texture = new Texture(generateTexture(0x00e7c2, 0x02a0ea));
        texture.needsUpdate = true; // important!
        var material = new MeshBasicMaterial({ map: texture, transparent: true });
        // var material = new MeshBasicMaterial( { color: 0x02a0ea } );
        var hit1 = new Mesh(geometry, material);
        this.scene.add(hit1);
        hit1.position.set(-this.trackBetween, 0, 300);

        var hit2 = hit1.clone();
        this.scene.add(hit2);
        hit2.position.x = 0;

        var hit3 = hit1.clone();
        this.scene.add(hit3);
        hit3.position.x = this.trackBetween;

        var geometry = new CircleGeometry(40, 32);
        texture.needsUpdate = true; // important!
        var material = new MeshBasicMaterial({ transparent: true, opacity: 0 });
        // var material = new MeshBasicMaterial( { color: 0x02a0ea } );
        var hitInside1 = new Mesh(geometry, material);
        this.scene.add(hitInside1);
        hitInside1.position.set(-this.trackBetween, 0, 299);
        hitInside1.name = "hitInside0";

        var hitInside2 = hitInside1.clone();
        this.scene.add(hitInside2);
        hitInside2.position.x = 0;
        hitInside2.name = "hitInside1";

        var hitInside3 = hitInside1.clone();
        this.scene.add(hitInside3);
        hitInside3.position.x = this.trackBetween;
        hitInside3.name = "hitInside2";

        var geometry = new PlaneGeometry(1, this.trackBetween - 50, 16);
        var material = new MeshBasicMaterial({ color: 0x02a0ea });
        var hitLine1 = new Mesh(geometry, material);
        this.scene.add(hitLine1);
        hitLine1.rotation.set(0, 0, Math.PI / 2);
        hitLine1.position.set(-this.trackBetween / 2, 0, 300);

        var hitLine2 = hitLine1.clone();
        this.scene.add(hitLine2);
        hitLine2.position.x = this.trackBetween / 2;

        var geometry = new PlaneGeometry(1, 400, 16);
        var material = new MeshBasicMaterial({ color: 0x02a0ea });
        var hitLine3 = new Mesh(geometry, material);
        this.scene.add(hitLine3);
        hitLine3.rotation.set(0, 0, Math.PI / 2);
        hitLine3.position.set(-(this.trackBetween + 25 + 200), 0, 300);

        var hitLine4 = hitLine3.clone();
        this.scene.add(hitLine4);
        hitLine4.position.x = this.trackBetween + 25 + 200;

        function generateTexture(color1, color2) {
            var hex1 = toHEX(color1);
            var hex2 = toHEX(color2);

            var size = 512;
            var canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            var context = canvas.getContext("2d");
            // draw gradient
            context.rect(0, 0, size, size);
            var gradient = context.createLinearGradient(0, 0, 0, size);
            gradient.addColorStop(0, hex1);
            gradient.addColorStop(1, hex2);
            context.fillStyle = gradient;
            context.fill();

            return canvas;

            function toHEX(color) {
                var hex = color.toString(16);
                while (hex.length < 6) {
                    hex = "0" + hex;
                }
                return "#" + hex;
            }
        }

        var makeNote = (index, position, color) => {
            var geometry = new SphereGeometry(20, 16, 16);
            var material = new MeshLambertMaterial({ color: color });
            var note = new Mesh(geometry, material);
            this.noteContainer.add(note);
            var posX = (position[0] - 1) * this.trackBetween;
            var posZ = position[1];
            note.position.set(posX, 0, posZ);
            note.name = index;
        };

        var makeLine = (index, position, length, color) => {
            var geometry = new CylinderGeometry(20, 20, length, 16);
            var material = new MeshLambertMaterial({ color: color });
            var line = new Mesh(geometry, material);
            this.noteContainer.add(line);
            line.rotation.x = Math.PI / 2;
            var posX = (position[0] - 1) * this.trackBetween;
            var posZ = position[1] + length / 2;
            line.position.set(posX, 0, posZ);
            line.name = "line" + index;
        };

        //從樂譜畫出音符
        var drawScore = score => {
            var notes = [];
            var line = [[], [], []];
            var noteIndexCount = 0;

            var bar = 0;
            for (var i = 0; i < score.length; i++) {
                //每小節
                var beat = 0;
                for (var j = 0; j < score[i].length; j++) {
                    //每beat
                    for (var k = 0; k < score[i][j].length - 1; k++) {
                        //每音符
                        var posZ = -(bar * 4 + beat) * this.screenHeight * this.scoreSpeed / 4;
                        if (score[i][j][k] != 0) {
                            if (score[i][j][k] != 2 || !line[k].length) {
                                var note = new Note();
                                note.index = noteIndexCount;
                                note.position = [i, beat, k];
                                note.realTime = (bar * 4 + beat) * 60 / _this.bpm;
                                note.type = score[i][j][k];
                                // var color = _this.noteColors[Math.floor(Math.random()*_this.noteColors.length)];
                                var color = _this.noteColors[noteIndexCount % _this.noteColors.length];
                                note.color = color;
                                notes.push(note);
                                noteIndexCount++;
                            }

                            if (score[i][j][k] == 1) {
                                makeNote(note.index, [k, posZ], color);
                                line[k] = [];
                            } else {
                                if (score[i][j][k] == 2) {
                                    if (line[k].length) {
                                        //line中間
                                        line[k][1] = 1 / (1 / line[k][1] + 1 / score[i][j][3]); //line的beat長度
                                    } else {
                                        //line開始點
                                        makeNote(note.index, [k, posZ], color);
                                        // isLineing = true;
                                        line[k][0] = color;
                                        line[k][1] = score[i][j][3];
                                        line[k][2] = note.index;
                                    }
                                } else {
                                    //line結束點
                                    var lineLength = 1 / line[k][1] * this.screenHeight * this.scoreSpeed;
                                    makeLine(line[k][2], [k, posZ], lineLength, line[k][0]);
                                    makeNote(note.index, [k, posZ], line[k][0]);
                                    notes[line[k][2]].duration = bar * 4 + beat - (notes[line[k][2]].position[0] * 4 + notes[line[k][2]].position[1]);
                                    note.color = line[k][0];
                                    line[k] = [];
                                }
                            }
                        }
                    }
                    beat += 4 / score[i][j][3];
                }
                bar++;
            }
            _this.notes = notes;
        };

        function Note() {
            this.index = undefined;
            this.type = 0; // 1:點按 2:長壓開頭 3:長壓結尾
            this.color = undefined; // 顏色
            this.position = []; // 在譜上的位置 [第n小節,第n拍,第n軌]
            this.duration = 0; // 持續時間(拍)（長條才有）
            this.realTime = 0; // 對應真實時間 (s)
            this.point = 0; // 分數
            this.stat = 0; // 0:初始 1:hit 2:miss
        }

        this.updatingLineZ = [];
        this.hitAnimateCount = [0, 0, 0];

        //touch events
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();

        document.getElementById("game").addEventListener("touchstart", this.touchEvent);
        document.getElementById("game").addEventListener("touchend", this.touchEvent);

        //key events
        window.addEventListener("keydown", this.keyDownEvent);
        window.addEventListener("keyup", this.keyUpEvent);

        drawScore(this.score);

        //按下按鍵
        //誤差範圍：0.5拍
        //0.5拍內的誤差按下都算有按
        //0.3拍內ok, 0.2拍內great
        this.isPressing = [false, false, false];
        this.holdingNotes = [null, null, null];
        this.combo = 0;
    };

    hit = trackNum => {
        // 遊戲還沒開始或暫停就不處理
        if (!this.state.isPlaying) return;

        // 按鍵還壓著就不處理
        if (this.isPressing[trackNum]) return;
        this.isPressing[trackNum] = true;

        this.hitAnimate(trackNum);

        // 找出距離按鍵時間最近的音符
        var minDiff = 999;
        var noteIndex;
        this.notes.forEach(note => {
            if (note.position[2] == trackNum) {
                var beatDiff = Math.abs((this.currTime[0] - note.position[0]) * 4 + (this.currTime[1] - note.position[1]));
                if (beatDiff < 0.5) {
                    if (beatDiff < minDiff) {
                        noteIndex = note.index;
                        minDiff = beatDiff;
                    }
                }
            }
        });

        // 最近的音符距離超過0.5拍就不處理
        if (minDiff > 0.5) return;

        var note = this.notes[noteIndex];

        // 音符是長條釋放點就不處理
        if (note.type == 3) return;

        // 音符有被按過就不處理
        if (this.notes[note.index].stat != 0) return;

        //暫存正在按著的line
        if (note.type == 2) {
            this.holdingNotes[trackNum] = note;
        }

        // 判斷此音符的分數
        if (minDiff < 0.2) {
            this.notes[note.index].point = 100;
            this.notes[note.index].stat = 1;
        } else if (minDiff < 0.3) {
            this.notes[note.index].point = 50;
            this.notes[note.index].stat = 1;
        } else {
            this.notes[note.index].point = 0;
            this.notes[note.index].stat = 2;
        }
        this.noteChangeUI(note.index);
        this.checkCombo();
        this.pointCompute();
    };

    hitAnimate = trackNum => {
        var geometry = new RingGeometry(25, 25.5, 32, 1);
        var material = new MeshBasicMaterial({ color: 0xffffff, transparent: true });
        var hitCircle = new Mesh(geometry, material);
        this.scene.add(hitCircle);
        hitCircle.position.set((trackNum - 1) * this.trackBetween, 0, 300);

        TweenMax.fromTo(hitCircle.scale, 0.3, { x: 1, y: 1 }, { x: 1.5, y: 1.5 });
        TweenMax.fromTo(
            hitCircle.material,
            0.3,
            { opacity: 1 },
            {
                opacity: 0,
                onComplete: argument => {
                    this.scene.remove(hitCircle);
                }
            }
        );
    };

    showNoteScore = note => {
        var canvas = document.createElement("canvas");
        canvas.width = canvas.height = 128;
        var context = canvas.getContext("2d");
        context.font = "Bold 40px Arial";
        context.fillStyle = "rgba(255,255,255,1)";
        context.textAlign = "center";
        context.fillText("+" + note.point, 64, 78);
        // canvas contents will be used for a texture
        var texture = new Texture(canvas);
        texture.needsUpdate = true;

        var material = new MeshBasicMaterial({ map: texture, transparent: true });

        var geometry = new PlaneGeometry(50, 50);
        var hitText = new Mesh(geometry, material);
        this.scene.add(hitText);
        hitText.position.set((note.position[2] - 1) * this.trackBetween, 25, 300);

        TweenMax.to(hitText.position, 0.5, { y: hitText.position.y + 40 });
        TweenMax.fromTo(
            hitText.material,
            0.5,
            { opacity: 1 },
            {
                opacity: 0,
                onComplete: argument => {
                    this.scene.remove(hitText);
                }
            }
        );
    };

    ExplodeAnimation(position, color, totalObjects, smallSpeed, scene) {
        // this.index = index;
        var dirs = [];
        var movementSpeed = 5;
        var objectSize = 10;
        var geometry = new Geometry();

        for (var i = 0; i < totalObjects; i++) {
            var vertex = new Vector3();
            vertex.x = position[0];
            vertex.y = position[1];
            vertex.z = position[2];

            geometry.vertices.push(vertex);
            dirs.push({ x: Math.random() * movementSpeed - movementSpeed / 2, y: Math.random() * movementSpeed - movementSpeed / 2, z: Math.random() * movementSpeed - movementSpeed / 2 });
        }
        var material = new PointsMaterial({ size: (Math.random() / 2 + 0.5) * objectSize, map: createCanvasCircle(color, 64), transparent: true });
        var particles = new Points(geometry, material);
        particles.name = "explode";

        var object = particles;
        var status = true;

        scene.add(object);

        var deathCountdown = objectSize;

        this.update = function() {
            if (deathCountdown <= 0) {
                scene.remove(object);
                // _this.explodes.splice(0, 1);
            } else {
                if (status == true) {
                    var pCount = totalObjects;
                    while (pCount--) {
                        var particle = object.geometry.vertices[pCount];
                        particle.y += dirs[pCount].y;
                        particle.x += dirs[pCount].x;
                        particle.z += dirs[pCount].z;
                        object.material.size = Math.max(object.material.size - smallSpeed, 0);
                        deathCountdown -= smallSpeed;
                    }
                    object.geometry.verticesNeedUpdate = true;
                }
            }
        };

        function createCanvasCircle(color, size) {
            var hex = color.toString(16);
            while (hex.length < 6) {
                hex = "0" + hex;
            }
            hex = "#" + hex;
            var matCanvas = document.createElement("canvas");
            matCanvas.width = matCanvas.height = size;
            var matContext = matCanvas.getContext("2d");
            // create exture object from canvas.
            var texture = new Texture(matCanvas);
            // Draw a circle
            var center = size / 2;
            matContext.beginPath();
            matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
            matContext.closePath();
            matContext.fillStyle = hex;
            matContext.fill();
            texture.needsUpdate = true;
            return texture;
        }
    }
    getTrackNumByKeyCode = keyCode => {
        //z:90 x:88 c:67
        //a:65 s:83 d:68
        if (keyCode == 65) {
            return 0;
        } else if (keyCode == 83) {
            return 1;
        } else if (keyCode == 68) {
            return 2;
        } else {
            return null;
        }
    };
    scoreMoveUI = pixel => {
        this.noteContainer.position.z = pixel;
        // this.noteContainer.position.z += 100;
        // $(".test").html(this.noteContainer.position.z);
    };

    noteChangeUI = index => {
        var point = this.notes[index].point;
        this.showNoteScore(this.notes[index]);
        var note = this.scene.getObjectByName(index);
        this.noteContainer.remove(note);
        // note.visible = false;

        if (this.showExplode) {
            this.explodes.push(new this.ExplodeAnimation([(this.notes[index].position[2] - 1) * this.trackBetween, 0, 300], this.notes[index].color, 20, 0.01, this.scene));
        }
    };

    release = trackNum => {
        if (this.holdingNotes[trackNum]) {
            var lineNote = this.holdingNotes[trackNum];
            var releaseNote = this.notes.find(function(note) {
                if (note.position[2] == lineNote.position[2]) {
                    if (note.position[0] > lineNote.position[0]) {
                        if (note.type == 3) {
                            return note;
                        }
                    } else if (note.position[0] == lineNote.position[0] && note.position[1] > lineNote.position[1]) {
                        if (note.type == 3) {
                            return note;
                        }
                    }
                }
            });

            var beatDiff = Math.abs((this.currTime[0] - releaseNote.position[0]) * 4 + (this.currTime[1] - releaseNote.position[1]));

            if (beatDiff < 0.2) {
                this.notes[releaseNote.index].point = 100;
                this.notes[releaseNote.index].stat = 1;
                this.noteChangeUI(releaseNote.index);
            } else if (beatDiff < 0.3) {
                this.notes[releaseNote.index].point = 50;
                this.notes[releaseNote.index].stat = 1;
                this.noteChangeUI(releaseNote.index);
            } else if (beatDiff < 0.5) {
                this.notes[releaseNote.index].point = 0;
                this.notes[releaseNote.index].stat = 2;
            }

            this.holdingNotes[trackNum] = null;
            this.updatingLineZ[trackNum] = undefined;

            this.checkCombo();
            this.pointCompute();
        }
        this.isPressing[trackNum] = false;
    };

    getPositionFromTime = () => {
        // 從時間算出現在位置
        // 1秒 = (bpm/60) beats
        var beat = this.audio.currentTime * this.bpm / 60;
        var bar = parseInt(beat / 4);
        beat = (beat % 4).toFixed(2);
        return [bar, beat];
    };

    noteMiss = () => {
        this.notes.forEach(note => {
            if (this.audio.currentTime > note.realTime) {
                if (note.stat == 0) {
                    var beatDiff = (this.currTime[0] - note.position[0]) * 4 + (this.currTime[1] - note.position[1]);
                    if (beatDiff > 0.5) {
                        note.stat = 2;
                        var note = this.scene.getObjectByName(note.index);
                        this.noteContainer.remove(note);
                        // this.showMiss();
                        this.setState({
                            combo: 0
                        });
                    }
                }
            }
        });
    };
    lineUpdate = () => {
        this.holdingNotes.forEach(note => {
            if (note) {
                //有按著的長條
                var point = note.point;
                var line = this.scene.getObjectByName("line" + note.index);

                if (this.hitAnimateCount[note.position[2]] % 12 == 0) {
                    this.hitAnimate(note.position[2]);
                }
                this.hitAnimateCount[note.position[2]]++;

                var beatDiff = (this.currTime[0] - note.position[0]) * 4 + (this.currTime[1] - note.position[1]);
                var progress = Math.max(Math.min(beatDiff / note.duration, 1), 0); //0~1
                if (!this.updatingLineZ[note.position[2]]) {
                    this.updatingLineZ[note.position[2]] = line.position.z;
                }
                if (progress == 1) {
                    line.visible = false;
                    return;
                }
                line.scale.y = 1 - progress;
                line.position.z = this.updatingLineZ[note.position[2]] - line.geometry.parameters.height * progress / 2;

                if (this.showExplode) {
                    this.explodes.push(new this.ExplodeAnimation([(note.position[2] - 1) * this.trackBetween, 0, 300], note.color, 2, 0.1, this.scene));
                }
            }
        });
    };

    scoreMove = () => {
        this.scoreMoveUI(this.scoreBottom + this.audio.currentTime * this.scoreMovePerSec);
    };

    playAudio = () => {
        this.audio.currentTime = this.currRealTime;
        this.audio.muted = false;
        if (this.audio.currentTime == 0) {
            this.audio.play();
        }
    };

    playSchedule = () => {
        if (this.state.isPlaying) {
            requestAnimationFrame(this.playSchedule);
            this.currTime = this.getPositionFromTime();
            this.scoreMove();
            this.noteMiss();
            this.lineUpdate();
            if (this.currTime[0] > this.songLength) {
                // console.log("end");
                this.stop();
                this.props.onGameOver(this.state.totalPoint);
            }
        }
    };

    play = () => {
        // this.state.isPlaying = true;
        this.setState(
            {
                isPlaying: true
            },
            () => {
                this.ticker = requestAnimationFrame(this.tick);
                this.playAudio();
                this.playSchedule();
            }
        );
    };
    stop = () => {
        this.audio.muted = true;
        this.currRealTime = this.audio.currentTime;
        // this.state.isPlaying = false;
        this.setState({
            isPlaying: false
        });
        // preTime = null;
    };

    checkCombo = () => {
        var combo = 0;
        this.notes.forEach(note => {
            if (note.stat == 1) {
                combo++;
            } else if (note.stat == 2) {
                combo = 0;
            }
        });
        this.setState({ combo: combo });
        // $(".combo").html(combo);
        // if(combo!=0) {
        //     showCombo();
        // } else {
        //     showMiss();
        // }
    };
    pointCompute = () => {
        var totalPoint = 0;
        for (var i = 0; i < this.notes.length; i++) {
            totalPoint += this.notes[i].point;
        }
        this.setState({
            totalPoint: totalPoint
        });
        // _this.totalPoint = totalPoint;
        // $(".total-point").html(_this.totalPoint);
    };
    // showCombo = () => {
    //     $(".combo-container").addClass('active');
    //     $(".miss-container").removeClass('active');
    // }

    // showMiss = () => {
    //     $(".combo-container").removeClass('active');
    //     $(".miss-container").addClass('active');
    // }

    _selectMode = mode => {
        // if (mode == 1) {
        //     this.musicGame = new this.MusicGame({ bpm: 113, audioUrl: music, score: easy });
        // } else if (mode == 2) {
        //     this.musicGame = new this.MusicGame({ bpm: 113, audioUrl: music, score: normal });
        // } else {
        //     this.musicGame = new this.MusicGame({ bpm: 113, audioUrl: music, score: hard });
        // }
    };
    _start = () => {
        this.setState({
            start: true
        });
        this.props.appContext.toggleBgmForceMuted(true);
        if (this.state.isPlaying) {
            this.stop();
            // $(this).html("start");
        } else {
            this.play();
            // $(this).html("stop");
        }
    };

    keyDownEvent = e => {
        var trackNum = this.getTrackNumByKeyCode(e.keyCode);
        if (trackNum != null) {
            this.hit(trackNum);
        }
    };

    keyUpEvent = e => {
        var trackNum = this.getTrackNumByKeyCode(e.keyCode);
        if (trackNum != null) {
            this.release(trackNum);
        }
    };

    touchEvent = event => {
        event.preventDefault();
        for (var i = 0; i < event.changedTouches.length; i++) {
            this.mouse.x = event.changedTouches[i].clientX / window.innerWidth * 2 - 1;
            this.mouse.y = -(event.changedTouches[i].clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            var intersects = this.raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                intersects.forEach(intersect => {
                    console.log(intersect);
                    if (intersect.object.name.indexOf("hitInside") != -1) {
                        if (event.type == "touchstart") {
                            this.hit(intersect.object.name.substring(intersect.object.name.length - 1));
                        } else {
                            this.release(intersect.object.name.substring(intersect.object.name.length - 1));
                        }
                    }
                });
            }
        }
    };

    resize = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight - 60);
        this.camera.aspect = window.innerWidth / (window.innerHeight - 60);
        this.camera.updateProjectionMatrix();
    };
    tick = () => {
        if (this.state.isPlaying) {
            this.ticker = requestAnimationFrame(this.tick);
        }

        var pCount = this.explodes.length;
        while (pCount--) {
            this.explodes[pCount].update();
        }
        this.renderer.render(this.scene, this.camera);
    };

    render() {
        return (
            <div className="rhythmGame">
                <canvas id="game" />
                <p className="rhythmGame__score">{this.state.totalPoint}</p>
                <div className="ui">
                    <div className={`combo-container ${this.state.combo !== 0 ? "active" : ""}`}>
                        <span className="combo">{this.state.combo}</span>
                        <span>combo</span>
                    </div>
                    <div className={`miss-container ${this.state.combo == 0 ? "active" : ""}`}>
                        <span>MISS!</span>
                    </div>
                </div>

                {!this.state.start ? (
                    <div className="rhythmGame__ready">
                        <div className="rhythmGame__wrapper">
                            <Scrollbars>
                                <div className="rhythmGame__contentWrapper">
                                    <p className="rhythmGame__title">
                                        <FormattedMessage id="intl.rhythmgame.confrim.title" />
                                    </p>
                                    <p className="rhythmGame__text">
                                        <FormattedHTMLMessage id="intl.rhythmgame.confrim.text" />
                                    </p>
                                    {/* <img className="rhythmGame__gif" src="http://via.placeholder.com/400x200" /> */}
                                    <div className="rhythmGame__tip">
                                        <video className="rhythmGame__tipVideo" width="400" height="200" loop autoPlay="1" playsInline="playsinline" muted src={tip} />
                                    </div>

                                    <div>
                                        <RoundBtn onClick={this._start}>
                                            <FormattedMessage id="intl.rhythmgame.confrim.btn" />
                                        </RoundBtn>
                                    </div>
                                    <p className="rhythmGame__info">
                                        <FormattedMessage id="intl.rhythmgame.confrim.opensound" />
                                    </p>
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default RhythmGame;
