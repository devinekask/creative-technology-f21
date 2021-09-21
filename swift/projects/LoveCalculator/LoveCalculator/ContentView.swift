//
//  ContentView.swift
//  LoveCalculator
//
//  Created by Wouter Verweirder on 21/09/2021.
//

import SwiftUI

struct ContentView: View {
    
    @State var collega1Index:Int
    @State var collega2Index:Int
    @State var randomPercentage:Int
    
    var body: some View {
        
        ZStack {
            Image("background_2")
                .resizable()
                .edgesIgnoringSafeArea(.all)
            VStack {
                Spacer()
                Image("logo_love_calculator")
                    .resizable(resizingMode: .stretch)
                    .aspectRatio(contentMode: .fit)
                    .padding(.horizontal)
                Spacer()
                HStack {
                    Image("collega\(collega1Index)")
                        .resizable(resizingMode: .stretch)
                        .aspectRatio(contentMode: .fit)
                    Image("collega\(collega2Index)")
                        .resizable(resizingMode: .stretch)
                        .aspectRatio(contentMode: .fit)
                }
                .padding(.horizontal)
                
                Spacer()
                Text("\(randomPercentage)% match")
                    .font(.largeTitle)
                    .foregroundColor(Color.white)
                Spacer()
                
                Button("Shuffle") {
                    self.collega1Index = Int.random(in: 1...13)
                    
                    self.collega2Index = generateUniqueRandomInt(in: 1...13, except: self.collega1Index)
                    
                    self.randomPercentage = Int.random(in: 0...100)
                }
                .foregroundColor(.white)
                .padding(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
                .font(/*@START_MENU_TOKEN@*/.headline/*@END_MENU_TOKEN@*/)
                .background(/*@START_MENU_TOKEN@*//*@PLACEHOLDER=View@*/Color.black/*@END_MENU_TOKEN@*/)
                
                Spacer()
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        
        let random1 = generateUniqueRandomInt(in: 1...13, except: 0)
        let random2 = generateUniqueRandomInt(in: 1...13, except: random1)
        let randomMatch = Int.random(in: 0...100)
        
        ContentView(collega1Index: random1, collega2Index: random2, randomPercentage: randomMatch)
    }
}
