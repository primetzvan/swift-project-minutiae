//
//  AllDoorsTableViewController.swift
//  swift-minutiae-project
//
//  Created by Richard Feichtinger on 25.04.21.
//

import UIKit

protocol ChooseDoorCompletedDelegate {
    func selectedDoor(doorId: Int)
}


class AllDoorsTableViewController: UITableViewController {

    let queue = DispatchQueue(label: "queue1")
    var model = Model()
    var doorId = -1;
    var delegate: ChooseDoorCompletedDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        queue.async {
            self.download()
        }
    }
    
    func download(){
        
        let model = Model()
        if let url = URL(string: "http://0.0.0.0:3000/doorTable"){
            if let data = try? Data(contentsOf: url){
                if let json = try? JSONSerialization.jsonObject(with:data, options:[]){
                    if let array = json as? [Any]{
                        for obj in array {
                            if let dict = obj as? [String: Any]{
                                let doorTable = DoorTable()
                                doorTable.doorID = dict["doorID"] as! Int
                                doorTable.name = dict["Name"] as! String
                                doorTable.iP = dict["IP"] as! String
                                
                                model.door.append(doorTable)
                            }
                        }
                        DispatchQueue.main.async {
                            self.model = model
                            self.tableView.reloadData()
                        }
                    }
                }
            }else{
                print("failed to download")
            }
        }else{
            print("sinnlose URL")
        }
        
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return model.door.count
    }

    
    
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "login", for: indexPath)
        
        let element = model.door[indexPath.row]
        
        cell.detailTextLabel?.text = "\(element.name)"
        cell.textLabel?.text = "\(element.doorID)"

        // Configure the cell...

        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        doorId = model.door[indexPath.row].doorID
        delegate?.selectedDoor(doorId: doorId)
        print("door")
        print(doorId)
        dismiss(animated: true, completion: nil)
    }
    


    
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    

    
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            print("del")
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }
    }
    
    


    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
