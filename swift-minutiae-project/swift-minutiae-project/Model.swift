//
//  Model.swift
//  swift-minutiae-project
//
//  Created by Vanessa Primetzhofer on 09.04.21.
//

import Foundation

class Token{
    
}


class DoorTable{
    var doorID = 0
    var name = ""
    var iP = ""
}

class UserTable{
    var id = 0
    var firstName = ""
    var lastName = ""
    var email = ""
    var role = ""
}

class AccessTable{
    var userID = -1
    var doorID = -1
    var startDate = ""
    var endDate = ""
}

class Model{
    var door = [DoorTable]()
    var user = [UserTable]()
    var userAccesses = [AccessTable]()
    var currentUser:UserTable?
    var tokens = [Token]()
}
