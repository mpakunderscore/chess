// let iso = new Isomer(document.getElementById("floor"));

let Point  = Isomer.Point;
let Path   = Isomer.Path;
let Shape  = Isomer.Shape;
let Vector = Isomer.Vector;
let Color  = Isomer.Color;

let canvas = document.getElementById("main");
let iso = new Isomer(document.getElementById("main"));

let ctx = canvas.getContext('2d');

let red = new Color(160, 60, 50);
let blue = new Color(50, 60, 160);
let green = new Color(160, 60, 0);
let black = new Color(0, 0, 0);
let white = new Color(255, 255, 255);
let gray = new Color(200, 200, 200);

let color = new Color(200, 0, 0);

let hoverColor = new Color(150, 0, 0, 0.1);

let stage = new createjs.Stage("main");

iso.add(Shape.Prism(new Point(2, 7, 1), red));//
let dataUrl2 = canvas.toDataURL();//
let bitmap2 = new createjs.Bitmap(dataUrl2);//
bitmap2.name = 'uno';//
iso.canvas.clear();//

iso.add(Shape.Prism(new Point(4, 2, 1)));
let dataUrl1 = canvas.toDataURL();
let bitmap1 = new createjs.Bitmap(dataUrl1);
bitmap1.name = 'dos';
iso.canvas.clear();

function makeGrid() {

    for (let i = 21; i > 0; i--) {

        for (let j = 16; j > 0; j--) {

            if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1))
                iso.add(Shape.Prism(Point(i, j, 0)), gray);

            else
                iso.add(Shape.Prism(Point(i, j, 0)), black);
        }
    }
}

let angle = 0;

init();
draw();

function draw() {

    // Real Render:
    iso.canvas.clear();

    makeGrid();

    iso.add(Shape.Prism(new Point(2, 7, 1)), red);
    iso.add(Shape.Pyramid(Point(2, 7, 2)), red);

    iso.add(Shape.Prism(new Point(4, 2, 1)), red);
    iso.add(Shape.Pyramid(Point(4, 2, 2)), red);

    // iso.add(Shape.Prism(Point(20, 10, 0)), black);
    iso.add(Shape.Prism(Point(20, 10, 1)), red);
    iso.add(Shape.Prism(Point(20, 10, 2)), red);
    iso.add(Shape.Pyramid(Point(20, 10, 3)), red);

    iso.add(Shape.Pyramid(Point(3, 15, 1)), blue);


    iso.add(Shape.Pyramid(Point(1, 1, 1)), blue);
    iso.add(Octahedron(new Point(1, 1, 2)).rotateZ(new Point(1.5, 1.5, 0), angle), blue);
    angle += 2 * Math.PI / 60;
}

function init() {

    stage.enableMouseOver(10);
    stage.addChild(bitmap2);
    stage.addChild(bitmap1);//

    // bitmap1.on("mouseover", handleInteraction);//
    // bitmap1.on("mouseout", handleInteraction);//
    // bitmap2.on("mouseover", handleInteraction);
    // bitmap2.on("mouseout", handleInteraction);

    bitmap1.addEventListener("click", function(event) {//
        console.log('clicked Dos');//
    });//
    bitmap2.addEventListener("click", function(event) {
        console.log('clicked Uno');
    });
}

function Octahedron(origin) {

    /* Declare the center of the shape to make rotations easy */
    var center = origin.translate(0.5, 0.5, 0.5);
    var faces = [];

    /* Draw the upper triangle /\ and rotate it */
    var upperTriangle = new Path([
        origin.translate(0, 0, 0.5),
        origin.translate(0.5, 0.5, 1),
        origin.translate(0, 1, 0.5)
    ]);

    var lowerTriangle = new Path([
        origin.translate(0, 0, 0.5),
        origin.translate(0, 1, 0.5),
        origin.translate(0.5, 0.5, 0)
    ]);

    for (var i = 0; i < 4; i++) {
        faces.push(upperTriangle.rotateZ(center, i * Math.PI / 2));
        faces.push(lowerTriangle.rotateZ(center, i * Math.PI / 2));
    }

    /* We need to scale the shape along the x & y directions to make the
     * sides equilateral triangles */
    return new Shape(faces).scale(center, Math.sqrt(2)/2, Math.sqrt(2)/2, 1);
}

