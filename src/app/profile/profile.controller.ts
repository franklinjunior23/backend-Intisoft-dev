import { Request, Response } from "express";

class ProfileController {
  public getProfile = (req: Request, res: Response):void => {

    res.json({
        response: "200",
        message: "Profile",
      });
  };
}

export default new ProfileController();
