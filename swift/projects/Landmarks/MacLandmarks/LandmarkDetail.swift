//
//  LandmarkDetail.swift
//  Landmarks
//
//  Created by Wouter Verweirder on 23/08/2021.
//

import SwiftUI
import MapKit

struct LandmarkDetail: View {
    @EnvironmentObject var modelData: ModelData
    var landmark: Landmark
    
    var landmarkIndex: Int {
        modelData.landMarks.firstIndex(where: { $0.id == landmark.id})!
    }
    
    var body: some View {
        ScrollView {
            ZStack(alignment: Alignment(horizontal: .trailing, vertical: .top)) {
                MapView(coordinate: landmark.locationCoordinate)
                    .ignoresSafeArea(edges: .top)
                    .frame(height: 300.0)
                Button("Open In Map") {
                    let destination = MKMapItem(placemark: MKPlacemark(coordinate: landmark.locationCoordinate))
                    destination.name = landmark.name
                    destination.openInMaps()
                }
                .padding()
            }
            
            VStack(alignment:.leading, spacing:20) {
                HStack(spacing: 24) {
                    CircleImage(image: landmark.image.resizable())
                        .frame(width: 160, height: 160)
                    VStack(alignment: .leading) {
                        VStack {
                            HStack {
                                Text(landmark.name)
                                    .font(.title)
                                    .foregroundColor(.primary)
                                FavoriteButton(isSet: $modelData.landMarks[landmarkIndex].isFavorite)
                                    .buttonStyle(PlainButtonStyle())
                            }
                        }
                        VStack {
                            VStack(alignment: .leading) {
                                Text(landmark.park)
                                Text(landmark.state)
                            }
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        }
                        
                    }
                }
                Divider()
                
                Text("About \(landmark.name)")
                    .font(.title2)
                
                Text(landmark.description)
            }
            .padding()
            .frame(maxWidth: 700)
            .offset(y: -50)
        }
        .navigationTitle(landmark.name)
    }
}

struct LandmarkDetail_Previews: PreviewProvider {
    static let modelData = ModelData()
    static var previews: some View {
        LandmarkDetail(landmark: modelData.landMarks[0])
            .environmentObject(modelData)
    }
}
