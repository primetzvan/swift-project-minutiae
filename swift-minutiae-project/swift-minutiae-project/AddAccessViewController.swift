//
//  AddAccessViewController.swift
//  swift-minutiae-project
//
//  Created by Richard Feichtinger on 25.04.21.
//

import UIKit

class AddAccessViewController: UIViewController, ChooseDoorCompletedDelegate {
    
    @IBOutlet weak var door: UIButton!
    @IBOutlet weak var from: UIDatePicker!
    @IBOutlet weak var to: UIDatePicker!
    var user : UserTable?
    var newAccces = AccessTable()

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func selectDoor(_ sender: Any) {
        performSegue(withIdentifier: "selectDoor", sender: self)
    }
    
    func selectedDoor(doorId: Int) {
        newAccces.doorID = doorId
        door.setTitle("Door Nr. \(newAccces.doorID)", for: .normal)
    }
    
    @IBAction func save(_ sender: Any) {
        
        if (newAccces.doorID != -1)
        {
            newAccces.userID = (user?.id)!
            newAccces.startDate = ("\(from)")
            newAccces.endDate = ("\(to)")
            // addAccess() //einfügen sobald server GEHT!!!!
            print("Access: \(newAccces.doorID), \(newAccces.userID), \(newAccces.startDate)")
            
            newAccces = AccessTable()
            dismiss(animated: true, completion: nil)
        }
    }
    
    func addAccess() {
        let url = URL(string: "https://unserurl ka")!   //TODO

        // prepare json data
        let json: [String: Any] = ["State": 1]

        let jsonData = try? JSONSerialization.data(withJSONObject: json)

        // create post request
        var request = URLRequest(url: url)
        request.httpMethod = "POST"

        // insert json data to the request
        request.httpBody = jsonData
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue( "\(newAccces.userID)", forHTTPHeaderField: "UserID")
        request.setValue( "\(newAccces.doorID)", forHTTPHeaderField: "DoorID")
        request.setValue( "\(newAccces.startDate)", forHTTPHeaderField: "startDate")
        request.setValue( "\(newAccces.endDate)", forHTTPHeaderField: "endDate")

        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print(error?.localizedDescription ?? "No data")
                return
            }
            let responseJSON = try? JSONSerialization.jsonObject(with: data, options: [])
            if let responseJSON = responseJSON as? [String: Any] {
                print(responseJSON)
            }
        }

        task.resume()
        return
    }
    
    let dateFormatter: DateFormatter = {
           let formatter = DateFormatter()
           formatter.dateStyle = .long
           return formatter
       }()
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
            if let allDoorsController = segue.destination as? AllDoorsTableViewController{
                allDoorsController.delegate = self
            }
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


