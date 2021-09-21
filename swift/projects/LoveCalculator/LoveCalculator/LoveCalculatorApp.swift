//
//  LoveCalculatorApp.swift
//  LoveCalculator
//
//  Created by Wouter Verweirder on 21/09/2021.
//

import SwiftUI

@main
struct LoveCalculatorApp: App {
    var body: some Scene {
        let random1 = generateUniqueRandomInt(in: 1...13, except: 0)
        let random2 = generateUniqueRandomInt(in: 1...13, except: random1)
        let randomMatch = Int.random(in: 0...100)
        
        WindowGroup {
            ContentView(collega1Index: random1, collega2Index: random2, randomPercentage: randomMatch)
        }
    }
}

func generateUniqueRandomInt(in inRange: ClosedRange<Int>, except: Int) -> Int {
    var random = Int.random(in: inRange)
    while (random == except) {
        random = Int.random(in: inRange)
    }
    return random
}
