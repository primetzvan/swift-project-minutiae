//
//  UsersTableViewCell.swift
//  swift-minutiae-project
//
//  Created by Richard Feichtinger on 25.04.21.
//

import UIKit

class UsersTableViewCell: UITableViewCell {
    var model = Model()
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    
    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var id: UILabel!
}
