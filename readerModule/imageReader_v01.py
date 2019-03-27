import shutil
from PIL import Image, ImageDraw

def drawBoundaries(path, bounds, color):
    image_cp = path[:-4]+"_boxed.jpg"
    shutil.copy(path, image_cp)
    image_opened = Image.open(image_cp)
    draw = ImageDraw.Draw(image_opened)

    for bound in bounds:
        draw.polygon([
            bound.vertices[0].x, bound.vertices[0].y,
            bound.vertices[1].x, bound.vertices[1].y,
            bound.vertices[2].x, bound.vertices[2].y,
            bound.vertices[3].x, bound.vertices[3].y], None, color)
    image_opened.save(image_cp)

def detect_document(path):
    from google.cloud import vision
    import io
    client = vision.ImageAnnotatorClient()

    bounds = []

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.document_text_detection(image=image)

    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            print("Block Dimensions:", block.bounding_box)
            print('\nBlock confidence: {}\n'.format(block.confidence))

            for paragraph in block.paragraphs:
                bounds.append(paragraph.bounding_box)
                print('Paragraph confidence: {}'.format(paragraph.confidence))

                for word in paragraph.words:
                    word_text = ''.join([symbol.text for symbol in word.symbols])
                    try:
                        print('Word text: {} (confidence: {})'.format( word_text, word.confidence))
                    except:
                        print("skipped word")

                    for symbol in word.symbols:
                        try:
                            print('\tSymbol: {} (confidence: {})'.format(symbol.text, symbol.confidence))
                        except:
                            print("skipped symbol")
    i = 0
    for rect in bounds:
        i+=1
        print i,"th paragraph:\n"
        print(rect)
    drawBoundaries(path, bounds, 'red')

def main():
    path = '70184-Class-Notes-Jan-9-5.jpg'
    detect_document(path)
main()
