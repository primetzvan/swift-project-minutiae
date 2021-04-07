//
//  ViewController.swift
//  swift-minutiae-project
//
//  Created by Vanessa Primetzhofer on 03.03.21.
//

import UIKit
import LocalAuthentication

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func signIn(_ sender: UIButton) {
<<<<<<< HEAD
        authenticateUser();
=======
        
        print("authentifizierung aufgerufen")
        authenticateUser();
        
>>>>>>> df20bc4fa448ee02eb33e7938d20969b8f301d9b
    }
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
        
        
        if segue.identifier == "login" {
            if let viewController = segue.destination as? ViewController2
            {
                //viewController.tab_adress = self.address
                print("perform segue")
            }
        }
    }
    
    
    func authenticateUser() {
<<<<<<< HEAD
        
        let localAuthenticationContext = LAContext()
        localAuthenticationContext.localizedFallbackTitle = "Please use your Passcode"

        var authorizationError: NSError?
        let reason = "Authentication required"

        if localAuthenticationContext.canEvaluatePolicy(.deviceOwnerAuthentication, error: &authorizationError) {
            
            localAuthenticationContext.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { success, evaluateError in
                
                if success {
                    DispatchQueue.main.async() {
                        // TODO
                        //self.checkIfUserExists()
                        
                        
                        print("fingerprint succeed")
                        
                        self.performSegue(withIdentifier: "login", sender: self)
                    }
                    
                } else {
                    // Failed to authenticate
                    guard let error = evaluateError else {
                        return
                    }
                    print(error)
                
                }
            }
        } else {
            
            guard let error = authorizationError else {
                return
            }
            print(error)
        }
        
        /*let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            let reason = "Identify yourself!"
=======
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            let reason = "Identify yourself!"

            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) {
                [unowned self] success, authenticationError in

                DispatchQueue.main.async {
                    if success {
                        // TODO
                        //self.checkIfUserExists()
                        print("fingerprint succeed")
                        
                        performSegue(withIdentifier: "login", sender: self)

                    } else {
                        let ac = UIAlertController(title: "Authentication failed", message: "Sorry!", preferredStyle: .alert)
                        ac.addAction(UIAlertAction(title: "OK", style: .default))
                        self.present(ac, animated: true)
                    }
                }
            }
        } else {
            let ac = UIAlertController(title: "Touch ID not available", message: "Your device is not configured for Touch ID.", preferredStyle: .alert)
            ac.addAction(UIAlertAction(title: "OK", style: .default))
            present(ac, animated: true)
        }
    }
    
    
}
>>>>>>> df20bc4fa448ee02eb33e7938d20969b8f301d9b

            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) {
                [unowned self] success, authenticationError in

                DispatchQueue.main.async {
                    if success {
                        // TODO
                        //self.checkIfUserExists()
                        
                        
                        
                        print("fingerprint succeed")
                        
                        performSegue(withIdentifier: "login", sender: self)

                    } else {
                        let ac = UIAlertController(title: "Authentication failed", message: "Too bad!", preferredStyle: .alert)
                        ac.addAction(UIAlertAction(title: "OK", style: .default))
                        self.present(ac, animated: true)
                    }
                }
            }
        } else {
            let ac = UIAlertController(title: "Touch ID not available", message: "Your device is not configured for Touch ID.", preferredStyle: .alert)
            ac.addAction(UIAlertAction(title: "OK", style: .default))
            present(ac, animated: true)
        }*/
        
    }
}
