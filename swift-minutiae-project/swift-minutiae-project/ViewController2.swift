//
//  ViewController2.swift
//  swift-minutiae-project
//
//  Created by Vanessa Primetzhofer on 03.03.21.
//

import UIKit
import AudioToolbox

class ViewController2: UIViewController {
    
    
    var doorState = true;
    @IBOutlet weak var image: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    @IBAction func unlockLockDoor(_ sender: UIButton) {
        if self.doorState {
            // Vibrieren
            vibrate();
            //Bild ändern
            let lockImage = UIImage(systemName: "lock.rotation.open");
            let tinttableImage = lockImage?.withRenderingMode(.alwaysTemplate);
            image.image = tinttableImage;
            image.tintColor = UIColor.black;
            //Buttontext andern
            sender.setTitle("Lock", for: .normal);
            self.doorState = false;
        }else if !self.doorState{
            //Bild ändern
            let lockImage = UIImage(systemName: "lock.rotation");
            let tinttableImage = lockImage?.withRenderingMode(.alwaysTemplate);
            image.image = tinttableImage;
            image.tintColor = UIColor.black;
            //Buttontext andern
            sender.setTitle("Open", for: .normal);
            self.doorState = true;
        }
    }
    

    func vibrate() {
        AudioServicesPlayAlertSoundWithCompletion(SystemSoundID(kSystemSoundID_Vibrate)){}
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
