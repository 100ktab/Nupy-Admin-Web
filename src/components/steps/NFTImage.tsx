import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";
import {makeImage} from "@/util/externals/ai/client";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";
import {useCallback, useRef, useState} from "react";
import Image from "next/image";
import {useAccount} from "@/util/hooks/useAccount";
import {uploadByBase64, uploadFile} from "@/util/externals/storage/web3";
import {MessageTemplateType} from "@/util/enums/enum";

const NFTImage = () => {
  const createNFT = useCreateNFT()
  const account = useAccount()
  const [images, setImages] = useState([])
  const [file, setFile] = useState()
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef();

  const handleClickMakeImage = async () => {
    makeImage(createNFT.getNFTDescription())
      .then(result => {
        // API 호출 결과값(result)을 사용하는 로직 작성
        setImages(result)
      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });
  }

  const uploadIPFSByBase64 = (imageURL) => {
    if (createNFT.getCreateNFTInfo('nftImage')) {
      return
    }
    uploadByBase64(imageURL, account.getAddress())
      .then(result => {
        createNFT.setCreateInfo('nftImage', result)
        console.log(imageURL)
        createNFT.addChat({
          template: MessageTemplateType.DEFAULT,
          text: '',
          imageURL: imageURL
        })
        createNFT.addChat({
          template: MessageTemplateType.DEFAULT_BY_ADMIN,
          text: 'You have selected an image! Thank you :)'
        })
        createNFT.addChat({
          template: MessageTemplateType.ACTIVITY_DURATION,
          text: ''
        })
        createNFT.setCurrentTemplate(MessageTemplateType.ACTIVITY_DURATION)
      }).catch(e => {
        console.log(e)
    })
  }

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file)
      nextStep(e.target.files)
    }
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFile(file)
      nextStep(e.dataTransfer.files)
    }
  }, []);

  const handleClickUpload = () => {
    dragRef.current.querySelector('#uploadImage').click()
  }

  const handleClickDelete = () => {
    setFile()
  }

  const nextStep = (files) => {
    uploadFile(files, account.getAddress())
      .then(result => {
        console.log(result)
        createNFT.setCreateInfo('nftImage', result)
        createNFT.addChat({
          template: MessageTemplateType.DEFAULT_BY_ADMIN,
          text: 'Conveyed the image! Thank you :)'
        })
        createNFT.addChat({
          template: MessageTemplateType.ACTIVITY_DURATION,
          text: ''
        })
        createNFT.setCurrentTemplate(MessageTemplateType.ACTIVITY_DURATION)
      }).catch(e => console.log(e))
  }

  return (
    <ChatMessageByAdmin text={''} withImage={true}>
      <div className="w-[480px] p-6 bg-white rounded-2xl border border-zinc-400 flex-col justify-start items-start gap-5 inline-flex">
        <div className="flex-col justify-start items-start gap-1 flex">
          <div className="text-zinc-800 text-[22px] font-bold">NFT image</div>
          <div className="text-zinc-800 text-[16px] font-medium">Reflect NFT instructions and automatically generate images.<br/>
            Please press the button below!</div>
        </div>
        <div
          ref={dragRef}
          onDrop={handleDrop}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDragOver}
          onClick={handleClickUpload}
          className="px-10 py-5 rounded-2xl border border-zinc-400 w-full text-center"
        >
          <div className="w-[40px] h-[40px] relative mx-auto my-0">
            <Image src={"/images/icons/icon-upload.webp?1"} alt={'upload image'} fill/>
          </div>
          <div className="w-full">
            <input
              id="uploadImage"
              type="file"
              onChange={handleFileSelect}
              className={'hidden'}
            />
            <div className="flex-col justify-center items-center flex">
              <div className="text-zinc-800 text-[14px] font-medium">Drag a file or</div>
              <div className="justify-start items-start inline-flex">
                <div className="text-green-500 text-[14px] font-medium underline mr-[5px]">Select File</div>
                <div className="text-zinc-800 text-[14px] font-medium">Please do it.</div>
              </div>
            </div>
          </div>
        </div>
        {
          file &&
          <div className="w-[432px] p-3 bg-zinc-100 rounded-xl relative">
            <div className="justify-start items-center gap-3 flex ">
              <div className="w-10 h-10 relative rounded-md relative">
                <Image src={URL.createObjectURL(file)} alt={'upload file image'} fill/>
              </div>
              <div className="flex-col justify-start items-start inline-flex">
                <div className="text-zinc-800 text-sm font-medium">{file.name}</div>
                <div className="text-zinc-500 text-xs font-normal">{(file.size / 1024).toFixed(2)} KB</div>
              </div>
            </div>
            <button
              className="top-[24px] right-[24px] absolute"
              onClick={handleClickDelete}
            >
              <Image src={'/images/icons/icon-delete.webp'} alt={'delete upload file'} width={16} height={16}/>
            </button>
          </div>
        }
        <button
          className="w-full h-14 px-5 py-2.5 bg-green-500 rounded-xl" onClick={handleClickMakeImage}>
          <div className="text-white text-[16px] font-bold">Create with AI</div>
        </button>
      </div>
      {
        images && images.length > 0 &&
        <div className="w-[480px] h-[221px] p-6 bg-white rounded-2xl border border border border border-zinc-400 flex-col justify-start items-start gap-5 inline-flex">
          <div className="text-zinc-800 text-[22px] font-bold">Please select the image you like!</div>
          <div className="justify-start items-start gap-3 inline-flex">
            {
              images.map((image, index) => {
                return (
                  <button
                    key={index}
                    className={"relative h-[120px] w-[120px]"}
                    onClick={() => {uploadIPFSByBase64(image)}}
                  >
                    <Image
                      src={image}
                      alt={'image'}
                      className={'rounded-2xl border border border border border-zinc-200'}
                      fill
                    />
                  </button>
                )
              })
            }
          </div>
        </div>
      }
    </ChatMessageByAdmin>
  )
}

export default NFTImage