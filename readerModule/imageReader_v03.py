import shutil
import json
from PIL import Image, ImageDraw
import argparse

def createImageCopy(path):
    image_cp = path[:-4]+"_boxed.jpg"
    shutil.copy(path, image_cp)
    return image_cp

def drawBoundaries(path, bounds, color):
    image_opened = Image.open(path)
    draw = ImageDraw.Draw(image_opened)

    for bound in bounds:
        draw.polygon([
            bound.vertices[0].x, bound.vertices[0].y,
            bound.vertices[1].x, bound.vertices[1].y,
            bound.vertices[2].x, bound.vertices[2].y,
            bound.vertices[3].x, bound.vertices[3].y], None, color)
    image_opened.save(path)

def getDiagramVertices(vertices):
    min_x = vertices[0].x
    min_y = vertices[0].y
    for vertex in vertices:
        if vertex.x < min_x:
            min_x = vertex.x
        if vertex.y < min_y:
            min_y = vertex.y
    return [min_x, min_y]

def detect_document(path):
    from google.cloud import vision
    import io
    client = vision.ImageAnnotatorClient()

    json_data = {}
    json_data["blocks"]=[]
    
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.document_text_detection(image=image)
    
    for page in response.full_text_annotation.pages:
        page_height = page.height
        page_width = page.width
        json_data["size"]={"width":page_width, "height":page_height}
        for block in page.blocks:
            bloc = {}
            bloc["bloc_str"]=""
            bloc["left_top_v"]={"x":block.bounding_box.vertices[0].x/float(page_width), "y":block.bounding_box.vertices[0].y/float(page_height)}
            bloc["right_bot_v"]={"x":block.bounding_box.vertices[2].x/float(page_width), "y":block.bounding_box.vertices[2].y/float(page_height)}
            bloc["paragraphs"]=[]
            
            for paragraph in block.paragraphs:
                para = {}
                para["para_str"] = ""
                para["left_top_v"] = {"x":paragraph.bounding_box.vertices[0].x/float(page_width), "y":paragraph.bounding_box.vertices[0].y/float(page_height)}
                para["right_bot_v"] = {"x":paragraph.bounding_box.vertices[2].x/float(page_width), "y":paragraph.bounding_box.vertices[2].y/float(page_height)}
                for word in paragraph.words:
                    word_text = ''.join([symbol.text for symbol in word.symbols])
                    try:
                        para["para_str"] += (word_text+' ')
                    except:
                        print("skipped word")
                #print(para)
                bloc["bloc_str"] += para["para_str"]
                bloc["paragraphs"].append(para)
            print(bloc)
            json_data["blocks"].append(bloc)

    print(json.dumps(json_data, indent=4, sort_keys=True))
#    print(json_data)

    with open('out.json', 'w') as outfile:
        json.dump(json_data, outfile)

#    i = 0
#    for rect in bounds_para:
#        i+=1
#        print i,"th paragraph:\n"
#        print(rect)
#    drawBoundaries(path, bounds_para, 'red')
#    drawBoundaries(path, bounds_block, 'green')
