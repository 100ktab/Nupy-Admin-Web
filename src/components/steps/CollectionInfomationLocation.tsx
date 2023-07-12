import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";
import {useEffect, useRef, useState} from "react";
import Map, {Layer, Marker, NavigationControl, Source} from "react-map-gl";
import * as turf from "@turf/turf";
import {MessageTemplateType} from "@/util/enums/enum";
import Tag from "@/components/Tag";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";

const CollectionInformationAddress = () => {
  const createNFT = useCreateNFT()
  const center = {
    longitude: createNFT.getLng(),
    latitude: createNFT.getLat()
  }
  const mapRef = useRef(null)
  const [range, setRange] = useState(0.05)
  const [viewState, setViewState] = useState({
    longitude: center.longitude ? center.longitude : -73.990593,
    latitude: center.latitude? center.latitude : 40.740121,
    zoom: 10
  });

  const ranges = [
    {
      type: 0.01,
      title: '10m',
    },
    {
      type: 0.05,
      title: '50m',
    },
    {
      type: 0.1,
      title: '100m',
    },
    {
      type: 1,
      title: '1km',
    },
    {
      type: 5,
      title: '5km',
    },
  ]

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current?.flyTo({center: center})
    }

  }, [])

  const onClick = (value) => {
    if (createNFT.getRange()) {
      return
    }
    setRange(value)
    if (value < 1) {
      setViewState((prev) => ({
        ...prev,
        zoom: 15
      }))
    }
    createNFT.setEventTemplate(value)
    createNFT.addChat({
      template: MessageTemplateType.DEFAULT,
      text: ranges.filter(item => item.type === value)[0].title
    })
    createNFT.addChat({
      template: MessageTemplateType.NFT_TITLE,
      text: ''
    })
    createNFT.setRange(value)
    createNFT.setCurrentTemplate(MessageTemplateType.NFT_TITLE)
    createNFT.nextStep()
  }

  return (
    <ChatMessageByAdmin
      text={'Please select the range you want based on the detailed address.'}
      withImage={true}
      childrenInBubble={ <div className="h-[350px] w-[480px] mt-[14px]">
        <Map
          id="displayMap"
          {...viewState}
          ref={mapRef}
          style={{borderRadius: '12px'}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.MAPBOX_TOKEN}
        >
          <NavigationControl/>
          {
            center.latitude && center.longitude &&
            <Marker longitude={center.longitude} latitude={center.latitude}/>
          }
          {
            center.latitude && center.longitude && range > 0 &&
            <Source type={'geojson'} data={turf.circle([center.longitude, center.latitude], range, {
              steps: 50, units: "kilometers"
            })}>
              <Layer
                id="point-90-hi"
                type="fill"
                paint={{
                  "fill-color": "#088",
                  "fill-opacity": 0.2,
                  "fill-outline-color": "yellow"
                }}
              />
            </Source>
          }
        </Map>
      </div>}
    >
      <div className={'gap-2 flex'}>
        {
          ranges.map((item, index) => {
            const selectedEventTemplate = createNFT.getSelectedEventTemplate()
            return <Tag
              key={index}
              text={item.title}
              onClick={() => {onClick(item.type)}}
              selected={selectedEventTemplate === item.type}
              value={item.type}
            />
          })
        }
      </div>
    </ChatMessageByAdmin>
  )
}

export default CollectionInformationAddress