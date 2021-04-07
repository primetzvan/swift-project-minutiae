//
//  ViewController2.swift
//  swift-minutiae-project
//
//  Created by Vanessa Primetzhofer on 03.03.21.
//

import UIKit
<<<<<<< HEAD
import AudioToolbox
=======
>>>>>>> df20bc4fa448ee02eb33e7938d20969b8f301d9b

class ViewController2: UIViewController {
    
    
    var doorState = true;
    @IBOutlet weak var image: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    @IBAction func unlockLockDoor(_ sender: UIButton) {
        if self.doorState {
<<<<<<< HEAD
            // Vibrieren
            vibrate();
            //Bild ändern
            let lockImage = UIImage(systemName: "lock.rotation.open");
=======
            //Bild ändern
            let lockImage = UIImage(systemName: "lock.open.fill");
>>>>>>> df20bc4fa448ee02eb33e7938d20969b8f301d9b
            let tinttableImage = lockImage?.withRenderingMode(.alwaysTemplate);
            image.image = tinttableImage;
            image.tintColor = UIColor.black;
            //Buttontext andern
<<<<<<< HEAD
            sender.setTitle("Lock", for: .normal);
            self.doorState = false;
        }else if !self.doorState{
            //Bild ändern
            let lockImage = UIImage(systemName: "lock.rotation");
=======
            sender.setTitle("Zu sperren", for: .normal);
            self.doorState = false;
        }else if !self.doorState{
            //Bild ändern
            let lockImage = UIImage(systemName: "lock.fill");
>>>>>>> df20bc4fa448ee02eb33e7938d20969b8f301d9b
            let tinttableImage = lockImage?.withRenderingMode(.alwaysTemplate);
            image.image = tinttableImage;
            image.tintColor = UIColor.black;
            //Buttontext andern
<<<<<<< HEAD
            sender.setTitle("Open", for: .normal);
=======
            sender.setTitle("Auf sperren", for: .normal);
>>>>>>> df20bc4fa448ee02eb33e7938d20969b8f301d9b
            self.doorState = true;
        }
    }
    

<<<<<<< HEAD
    func vibrate() {
        AudioServicesPlayAlertSoundWithCompletion(SystemSoundID(kSystemSoundID_Vibrate)){}
    }
=======
>>>>>>> df20bc4fa448ee02eb33e7938d20969b8f301d9b
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
