//
//  OverviewViewController.swift
//  swift-minutiae-project
//
//  Created by Richard Feichtinger on 25.04.21.
//

import UIKit

class OverviewViewController: UIViewController {
    
    @IBAction func viewDoors(_ sender: Any) {
        performSegue(withIdentifier: "showDoors", sender: self)
    }
    
    @IBAction func viewUsers(_ sender: Any) {
        performSegue(withIdentifier: "showUsers", sender: self)
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
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
