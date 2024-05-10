import xml.etree.ElementTree as et

tree = et.parse('cd_catalog.xml')
root = tree.getroot()
for child in root.findall('CD'):
    print('Artist:', child.find('ARTIST').text, ', Title:', child.find('TITLE').text, ', Decade:', child.attrib['decade'],sep='')
