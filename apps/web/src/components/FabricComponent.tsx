import React, { useEffect, useRef } from 'react'
import * as fabric from 'fabric'

const FabricComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fabricRef = useRef<fabric.Canvas|null>(null)

    const handleSvgUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const canvas = fabricRef.current;
      if (!canvas || !event.target.files) return;

      for (const file of Array.from(event.target.files)) {
        const fileUrl = URL.createObjectURL(file);
        try {
          const { objects, options } = await fabric.loadSVGFromURL(fileUrl);

          const filteredObjects = objects.filter(Boolean) as fabric.FabricObject[] ;
          const svgGroup = fabric.util.groupSVGElements(filteredObjects, options);

          svgGroup.set({
            left: 100,
            top: 100,
            scaleX: 0.5, // safer than setting width/height directly
            scaleY: 0.5,
          });

          canvas.add(svgGroup);
        } catch (error) {
          console.error('SVG load error:', error);
        }
      }

      canvas.renderAll();
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const canvas = fabricRef.current;
        if (!canvas || !event.target.files) return;

        Array.from(event.target.files).forEach(async(file) => {
          const fileUrl = URL.createObjectURL(file);

          const imageObject =  await fabric.Image.fromURL(fileUrl)
          imageObject.set({
            left: 100,
            top: 100,
            scaleX: 0.1,
            scaleY: 0.1,
          });

          canvas.add(imageObject)
        });

        canvas.renderAll()
    }


    useEffect(() => {
        if(!canvasRef.current) return

        fabricRef.current = new fabric.Canvas(canvasRef.current, {
            height : 300,
            width : 500,
            backgroundColor: '#f3f3f3'
        })

        fabricRef.current.renderAll()

        return () => {
          fabricRef.current?.dispose()
        }
    }, [])

  return (
    <div>
        <canvas ref={canvasRef}/>
        <input type="file" accept='.svg' onChange={handleSvgUpload}/>
        <input type='file' accept='.png,.psd' onChange={handleImageUpload}/>
    </div>
  )
}

export default FabricComponent