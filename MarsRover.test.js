const { executeComands, getRoverStatus, navigateTo, position } = require("./MarsRover");

describe("Rover Navigation", () => {
  beforeEach(() => {
    position.x = 0;
    position.y = 0;
    currentHeadingIndex = 0;
    stopped = false;
  });

  test("Rover should move forward when no obstacle is present", () => {
    executeComands("F"); 
    const status = getRoverStatus();
    expect(status.position).toEqual({ x: 1, y: 0 }); 
    expect(status.heading).toBe("EAST");
  });

  test("Rover should rotate left and move forward", () => {
    executeComands("FLFF"); 
    const status = getRoverStatus();
    expect(status.position).toEqual({ x: 1, y: 2 }); 
    expect(status.heading).toBe("NORTH");
  });

  test("Rover should navigate around obstacles to reach the target", () => {
    navigateTo(5, 5); 
    const status = getRoverStatus();
    expect(status.position).toEqual({ x: 5, y: 5 }); 
    expect(status.stopped).toBe(false); 
  });

  test("Rover should avoid multiple obstacles and still reach the target", () => {
    navigateTo(7, 6); 
    const status = getRoverStatus();
    expect(status.position).toEqual({ x: 7, y: 6 }); 
    expect(status.stopped).toBe(false); 
  });

  test("Rover should rotate right and avoid obstacle when blocked", () => {
    executeComands("ffLFFFF"); 
    const status = getRoverStatus();
    expect(status.position).toEqual({ x: 2, y: 4 }); 
    expect(status.heading).toBe("NORTH");
  });

  test("Rover should handle a series of Comands correctly", () => {
    executeComands("FFRFFF"); 
    const status = getRoverStatus();
    expect(status.position).toEqual({ x: 3, y: 2 }); 
    expect(status.heading).toBe("EAST"); 
  });
});
