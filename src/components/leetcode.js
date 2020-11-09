/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */

var getSkyline = function(buildings) {
   
    if(buildings.length == 0){
        return [];
    }
    console.log(this.buildings);
    let points = [];
    let currentBuildingIndex = 0; 
    let direction = "UP"; 
    let arrangedBuildings = arrangeFromLeftToRight(buildings);
    arrangedBuildings = getTallerBuilding(arrangedBuildings);
    let lastPoint = getLastPoint(arrangedBuildings);
    let currentY = 0;
    let currentX = arrangedBuildings[0][0];
    let exit = false;

    console.log("arranged: ", arrangedBuildings);
    console.log("last point: ", lastPoint);
    // this.pushFirst2Points(arrangedBuildings, points);
    // let x = 0;
    points.push([currentX, currentY]);

    let newIndex = currentBuildingIndex;
    while(!exit){
        // points.push([arrangedBuildings[currentBuildingIndex][0], currentY]);
        console.log("direction: ", direction);
        console.log("new index:", newIndex);
        if(direction == 'UP'){
            currentY = arrangedBuildings[currentBuildingIndex][2];
            points.push([currentX, currentY]);

            direction = 'FORWARD';


        }else if(direction == 'FORWARD'){
            newIndex = getNearestTallerBuilding2(arrangedBuildings, currentY, currentX, arrangedBuildings[currentBuildingIndex][1]);    
            console.log("new index: ", newIndex);
            if(newIndex == -1){
                currentX = arrangedBuildings[currentBuildingIndex][1];
                points.push([currentX, currentY]);
                direction = 'DOWN';
            }else{

                currentX = arrangedBuildings[newIndex][0];
                points.push([currentX, currentY]);
                direction = 'UP';
                currentBuildingIndex = newIndex;
            }
        }else if(direction == 'DOWN'){
            newIndex = getNearestRoof2(arrangedBuildings, currentX, currentY); 
            if(newIndex == -1){
                currentY = 0;
                direction = 'FORWARD_GROUND';
            }else{
                currentY = arrangedBuildings[newIndex][2];

                currentBuildingIndex = newIndex;
                direction = 'FORWARD';
            } 

            points.push([currentX, currentY]);
            // direction = 'FORWARD';
        }else if(direction == 'FORWARD_GROUND'){
            newIndex = getNearestBuilding(arrangedBuildings, currentX, lastPoint[0]);
            if(newIndex == -1){
                exit = true;
            }else{
                currentX = arrangedBuildings[newIndex][0];
                points.push([currentX, currentY]);
                currentBuildingIndex = newIndex;
                direction = 'UP';
            }

        }


    }

    console.log("current index: ", currentBuildingIndex);
    console.log("points: ", points);
    currentY = 0;
    let finalPoints = [];
    points.forEach((point, index) => {
        if(point[1] != currentY){
            finalPoints.push(point);
            currentY = point[1];
        }
    });

    console.log("final pts: ", finalPoints);
    return finalPoints;
        
    
}

var getLastPoint = function(arrangedBuildings){
    let lastIndex = 0;
    let lastBuilding = 0;
    arrangedBuildings.forEach((building, index) => {
        if(building[1] > lastBuilding){
            lastIndex = index;
            lastBuilding = building[1];
        }
    });

    return [arrangedBuildings[lastIndex][1], 0];
}

    

var getNearestBuilding = function(arrangedBuildings, xmin, xmax){
    let newIndex = -1;
    let nearestBuilding = xmax;



    arrangedBuildings.forEach((building, index) => {

        if(building[0] > xmin){
            if(building[0] < nearestBuilding){
                nearestBuilding = building[0];
                newIndex = index;


            }    
        }    
    });

    return newIndex;

}

var getNearestTallerBuilding2 = function(arrangedBuildings, currentY, xmin, xmax){
    let newIndex = -1;
    let nearestBuilding = xmax;



    arrangedBuildings.forEach((building, index) => {

        if(building[2] > currentY){
            if(building[0] > xmin && building[0] <= xmax){
                if(nearestBuilding > building[0]){
                    nearestBuilding = building[0];
                    newIndex = index;             
                }

            }    
        }    
    });

    return newIndex;

}

var getTallerBuilding = function(buildings){
    let arrangedBuildings = buildings.sort((a, b) => {

        if(a[0] == b[0]){
            return b[2] - a[2];
        }

    });  

    return arrangedBuildings;
}

var getNearestRoof2 = function(arrangedBuildings, xmin, ymax){
    let nearestRoof = 0;
    let newIndex = -1;

    arrangedBuildings.forEach((building, index) => {
        if(building[0] <= xmin && building[1] > xmin){
            if(building[2] > nearestRoof){
                nearestRoof = building[2]
                newIndex = index;
            }
        }

    });
    
    return newIndex;

}

var arrangeFromLeftToRight = function(buildings){
    let arrangedBuildings = buildings.sort((a, b) => {


        return a[0] - b[0];
    });  

    return arrangedBuildings;
}