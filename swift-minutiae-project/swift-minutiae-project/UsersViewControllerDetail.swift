//
//  UsersViewControllerDetail.swift
//  swift-minutiae-project
//
//  Created by Richard Feichtinger on 25.04.21.
//

import UIKit


class UsersViewControllerDetail: UITableViewController {

    let queue = DispatchQueue(label: "queue1")
    var model = Model()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        queue.async {
            self.download()
        }
    }
    
 
    
    
    func download(){
        
        let model = Model()
        if let url = URL(string: "http://0.0.0.0:3000/userTable"){
            if let data = try? Data(contentsOf: url){
                if let json = try? JSONSerialization.jsonObject(with:data, options:[]){
                    if let array = json as? [Any]{
                        for obj in array {
                            if let dict = obj as? [String: Any]{
                                let userTable = UserTable()
                                userTable.id = dict["userID"] as! Int
                                userTable.firstName = dict["firstname"] as! String
                                userTable.lastName = dict["lastname"] as! String
                                userTable.email = dict["email"] as! String
                                userTable.role = dict["role"] as! String

                                model.user.append(userTable)
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
        return model.user.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "login", for: indexPath) as! UsersTableViewCell
        
        let element = model.user[indexPath.row]
        
        cell.name.text = "\(element.lastName)"
        cell.id?.text = "\(element.id)"


        return cell
    }
    
  
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        model.currentUser = model.user[indexPath.row]

        print("selected cell \(indexPath.row)")
        performSegue(withIdentifier: "showAccesses", sender: self)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if let user = model.currentUser {
            if let detailViewController = segue.destination as? UserDetailViewController{
                detailViewController.user = user
            }
            if let accessTableViewController = segue.destination as? AccessTableViewController{
                accessTableViewController.user = user
            }
        }
    }


    @IBAction func showUser(_ sender: UIButton) {
        // TODO: set current user
        performSegue(withIdentifier: "showUser", sender: self)
    }
    
    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }
    }
    */

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
