var container;
    let counter = 0;
    let bones = [];
    //if you change NUM_BONES, it'll change the grid size
    let NUM_BONES = 5;
    let chances = 8;
    let totalchances = 8;

$(document).ready(function(){
    container = $("div#tiles");
    //number of tiles/block columns = NUM_BONES
    container.css("grid-template-columns", "repeat("+NUM_BONES+" , 1fr)");
    ///create tiles/block
    for(let i=0; i<NUM_BONES; i++)
    {
        createbones();
        for(let j=0; j<NUM_BONES; j++)
        {
            //counter for giving number to each block
            counter ++;
            createtiles();
        }
    }
    gamestatus();
});

///function that creates number of bones and uses random number like in the gameboard
function createbones(){
    let randomNumber = Math.floor(Math.random() * counter)+1;
    //check if bones array already contained that random number or not
    //if not then add
    if(jQuery.inArray(randomNumber, bones) === -1)
    {
        bones.push(randomNumber);
    }
    else{
        createbones();
    } 
}

//function that shows us the bones left and updates the danger status
function gamestatus(){
    let bonesleft =bones.length;
    $("#bones").html(bonesleft);
    let danger = $("#danger");
    let dangerstatus = totalchances - chances;
    //if bones not found and chances decrease
    if(dangerstatus > 0)
    {
        dangerstatus = dangerstatus+Math.round(totalchances/4);
    }

    danger.val(dangerstatus+"0");
}


// function to click
function clicktiles()
{
    /// which block is clicked
    const clickedbox = $(this);
    const clickedboxIndex = parseInt(clickedbox.attr('data-box-index'));

    ///if the block has been dug already
    if(clickedbox.hasClass("bonenotfound") || clickedbox.hasClass("bonefound"))
    {
        alert("You Already Dug Here!");
    }
    //otherwise
    else{
        gameplay(clickedboxIndex, clickedbox);
    }
    
}


//function for gameplay
function gameplay(guess, clickedbox){
    //first add class bone not found to clicked block
    clickedbox.addClass("bonenotfound");
    

    for(let i=0; i<bones.length; i++)
    {
        if(bones[i] ===guess)
        {
            chances ++;
            bones = jQuery.grep(bones, function(value) {
            return value !== bones[i];
            });
            clickedbox.removeClass("bonenotfound");
            clickedbox.addClass("bonefound");
        }
        console.log(bones[i]);
    }
    chances --;
    gamestatus();
    if(bones.length<=0)
    {
        alert("You Won!");
        location.reload();
    }
    else if(chances<=0 && bones.length>0)
    {
        alert("Game Over! You Lost");
        location.reload();
    }

}



///creates the tiles
function createtiles()
{
    let tile = $("<div data-box-index="+counter+">");
    tile.html(counter);
    tile.click(clicktiles);
    container.append(tile);
}

