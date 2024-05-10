<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="1.0">
<xsl:output method="html"/>
    <xsl:template match="/">
        <html>
            <body>
                
                <h2><xsl:value-of select="inventory/name" /> </h2>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th>roomName</th>
                        <th>category</th>
                        <th>itemType</th>
                        <th>itemColor</th>
                        <th>itemSize</th>
                        <th>quantity</th>
                    </tr>
                    <xsl:for-each select="inventory/room/item">
                        <tr>
                            <td>
                                <xsl:value-of select="roomName"/>
                            </td>
                            <td>
                                <xsl:value-of select="category"/>
                            </td>
                            <td>
                                <xsl:value-of select="itemType"/>
                            </td>
                            <td>
                                <xsl:value-of select="itemColor"/>
                            </td>
                            <td>
                                <xsl:value-of select="itemSize"/>
                            </td>
                            <td>
                                <xsl:value-of select="quantity"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>