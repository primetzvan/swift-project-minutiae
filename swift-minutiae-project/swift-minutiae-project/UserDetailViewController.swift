//
//  UserDetailViewController.swift
//  swift-minutiae-project
//
//  Created by Richard Feichtinger on 25.04.21.
//

import UIKit

class UserDetailViewController: UIViewController {

    @IBOutlet weak var id: UILabel!
    @IBOutlet weak var firstName: UITextField!
    @IBOutlet weak var lastName: UITextField!
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var admin: UISwitch!
    var user : UserTable?

    override func viewDidLoad() {
        super.viewDidLoad()
                
        id.text = "\((user?.id)!)"
        firstName.text = user?.firstName
        lastName.text = user?.lastName
        email.text = user?.email
        admin.isOn = (user?.role == "admin")


        // Do any additional setup after loading the view.
    }
    
    @IBAction func save(_ sender: Any) {
        //TODO
    }
    
    
}
