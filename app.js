window.onload = () => {
  const ball = document.querySelector(".ball");
  const ship = document.querySelector(".ship");
  const blocks = document.querySelectorAll(".block");
  const container = document.querySelector(".container");
  const scoreEl = document.querySelector(".score");

  let score = 0;
  let validBlocks = [];

  scoreEl.innerHTML = score;

  const ballD = {
    x1: ball.getBoundingClientRect().x,
    y1: ball.getBoundingClientRect().y,
    x2: ball.getBoundingClientRect().width,
    y2: ball.getBoundingClientRect().height,
  };

  blocks.forEach((block) => {
    validBlocks.push({
      x1: block.getBoundingClientRect().x,
      y1: block.getBoundingClientRect().y,
      x2: block.getBoundingClientRect().width,
      y2: block.getBoundingClientRect().height,
      element: block,
    });
  });

  validBlocks.splice(validBlocks.length - 1, 1);

  // validBlocks.forEach(block=>{
  //   const el = document.createElement("div");
  //   el.style.background="black";
  //   el.style.position = "absolute";
  //   el.style.left = `${block.x1}px`;
  //   el.style.top = `${block.y1}px`;
  //   el.style.width = `${block.x2}px`;
  //   el.style.height = `${block.y2}px`;
  //   console.log(el);

  //   document.body.appendChild(el);
  // })

  console.log(validBlocks);

  const Xend = window.innerWidth;
  const Yend = window.innerHeight;
  let shipCordinate = null;
  // console.log(Xend, Yend);

  let i = Xend / 2,
    j = ship.getBoundingClientRect().y - 20,
    a = 2,
    b = -2;

  const interval = setInterval(ballMove, 1);

  function ballMove() {
    ball.style.transform = `translate(${i}px,${j}px)`;
    ballD.x1 = i;
    ballD.y1 = j;
    ballD.x2 = i + 30;
    ballD.y2 = j + 30;

    if (a > 0 && i + 30 >= 0.8 * Xend) {
      a = -a;
    } else {
      if (i <= 0.2 * Xend) a = -a;
    }
    if (j <= 20) b = -b;

    if (j >= Yend) {
      b = -b;
      clearInterval(interval);
      setTimeout((window.location.href = "index.html"), 500);
    }

    if (
      shipCordinate &&
      ballD.x2 >= shipCordinate.x &&
      ballD.x1 <= shipCordinate.x + 100 &&
      ballD.y2 >= shipCordinate.y &&
      ballD.y1 <= shipCordinate.y
    ) {
      b = -b;
      j = j - 2;
    }

    // if (i >= 0.8*Xend || i <= 0.2*Xend) a = -a;
    // if (j <= 20) b = -b;

    // if (j >= Yend) {
    //   b=-b;
    //   clearInterval(interval);
    //   setTimeout("location.reload(true);", 50);
    // }
    // if (
    //   shipCordinate &&
    //   i >= shipCordinate.x + 30 &&
    //   i <= shipCordinate.x + 70 &&
    //   shipCordinate.y  <= j +30
    // )
    //   b = -b;

    //   if(!validBlocks.length){
    //     window.alert("i");
    //     clearInterval(interval);
    //   }

    for (let index = 0; index < validBlocks.length; index++) {
      let block = validBlocks[index];
      if (
        (ballD.x1 >= block.x1 &&
          ballD.x1 <= block.x2 + block.x1 &&
          ballD.y1 >= block.y1 &&
          ballD.y1 <= block.y2 + block.y1) ||
        ((ballD.x1 + ballD.x2) / 2 >= block.x1 &&
          (ballD.x1 + ballD.x2) / 2 <= block.x2 &&
          (ballD.y1 + ballD.y2) / 2 >= block.y1 &&
          (ballD.y1 + ballD.y2) / 2 <= block.y2 + block.y1)
      ) {
        block.element.classList.add("trans");
        b = -b;
        validBlocks.splice(index, 1);
        console.log(validBlocks.length);
        score += 10;
        scoreEl.innerHTML = score;
        break;
      }

      // if(i>=block.x1 && i<=block.x2+block.x1 && j>=block.y1 && j<=block.y2+block.y1 )
      //   {
      //     block.element.classList.add("trans")
      //     b = -b;
      //     a=-a
      //     validBlocks.splice(index,1);
      //     console.log(validBlocks.length)
      //     break;
      //   }
    }

    i += a;
    j += b;
  }

  document.body.addEventListener("mousemove", function (e) {
    shipCordinate = ship.getBoundingClientRect();
    ship.style.left = `${e.clientX - 50}px`;
  });

  const sound = document.querySelector(".audio");

  sound.addEventListener("click", () => {
    sound.children[0].muted = !sound.children[0].muted;
  });
};
