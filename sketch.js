const s = new p5((p) => {
    let url, video, input, button, randomWidth, randomHeight;

    function setGiphyUrl(searchString) {
        const apiKey = '436h1YFrF5k3rCRpjbHPFPxQ8jG0FmBC';
        let urlLimit = p.floor(p.random(1, 200));
        let urlOffset = p.floor(p.random(0, urlLimit));
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchString}&limit=${urlLimit}&offset=${urlOffset}&rating=R&lang=en`;
        p.loadJSON(url, json => video = p.createVideo([json.data[0].images.looping.mp4], positionNewGif));
    }

    function getGif(){
        let searchValue = input.value();

        if(searchValue) {
            setGiphyUrl(searchValue);
        }
    }

    function positionNewGif() {
        video.hide();
        video.loop();
        getRandomPosition();
    }

    function getRandomPosition() {
        //TODO: get width and height of the video and calculate the position to not be more than 1/4 out the video outside of the view

        randomWidth = p.floor(p.random(p.width));
        randomHeight = p.floor(p.random(p.height));
    }

    p.preload = () => {
        // url = setGiphyUrl('dad');

    };

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        input = p.createInput();
        input.position(20, 60);
        button = p.createButton('get gif');
        button.position(input.x + input.width, 60);
        button.mousePressed(getGif);
        getRandomPosition();
    };

    p.draw = () => {
        p.background(0);

        if (video) {
            //TODO: append new addition al video on every search without removing the previous one
            p.image(video, randomWidth, randomHeight);
        }
    };

    p.keyReleased = () => {
        if(p.keyCode === p.ENTER && input.value()) {
            getGif();
        }
    };

    // p.mousePressed = () => {
    //     let searchValue = input.value();
    //
    //     if(searchValue) {
    //         input.value('');
    //     }
    // };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}, 'sketch');
