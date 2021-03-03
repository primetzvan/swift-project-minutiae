//
//  ViewController2.swift
//  swift-minutiae-project
//
//  Created by Vanessa Primetzhofer on 03.03.21.
//

import UIKit

class ViewController2: UIViewController {
    
    
    var doorState = true;
    @IBOutlet weak var image: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    @IBAction func unlockLockDoor(_ sender: UIButton) {
        if self.doorState {
            //Bild ändern
            let lockImage = UIImage(systemName: "lock.open.fill");
            let tinttableImage = lockImage?.withRenderingMode(.alwaysTemplate);
            image.image = tinttableImage;
            image.tintColor = UIColor.black;
            //Buttontext andern
            sender.setTitle("Zu sperren", for: .normal);
            self.doorState = false;
        }else if !self.doorState{
            //Bild ändern
            let lockImage = UIImage(systemName: "lock.fill");
            let tinttableImage = lockImage?.withRenderingMode(.alwaysTemplate);
            image.image = tinttableImage;
            image.tintColor = UIColor.black;
            //Buttontext andern
            sender.setTitle("Auf sperren", for: .normal);
            self.doorState = true;
        }
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
