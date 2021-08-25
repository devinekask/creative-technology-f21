//
//  NotificationView.swift
//  WatchLandmarks Extension
//
//  Created by Wouter Verweirder on 24/08/2021.
//

import SwiftUI

struct NotificationView: View {
    
    var title: String?
    var message: String?
    var landmark: Landmark?
    
    var body: some View {
        VStack {
            if (landmark != nil) {
                CircleImage(image: landmark!.image.resizable())
                    .scaledToFit()
            }
            
            Text(title ?? "Unknown Landmark")
            
            Divider()
            
            Text(message ?? "You are within 5 miles of one of your favorite Landmarks")
                .font(.caption)
        }
        .lineLimit(0)
    }
}

struct NotificationView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            NotificationView()
            NotificationView(title: "Turtle Rock",
                message: "You are within 5 miles of Turtle Rock.",
                landmark: ModelData().landMarks[0])
        }
    }
}
