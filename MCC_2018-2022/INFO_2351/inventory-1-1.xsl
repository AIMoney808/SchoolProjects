<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="1.0">
    <xsl:template match="/">
        <html>
            <body>
                
                <h2><xsl:value-of select="inventory/name" /> </h2>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        
                        <th>Link</th>
                        <th>title</th>
                        <th>year</th>
                        <th>price</th>
                        <th>printing</th>
                        <th>ship_weight</th>
                        <th>isbn-10-ISBN)</th>
                        <th>isbn-13</th>
                        <th>in_stock</th>
                    </tr>
                    <xsl:for-each select="inventory/book">
                        <tr>
                            <td>
                                <xsl:value-of select="link"/>
                            </td>
                            <td>
                                <xsl:value-of select="title"/>
                            </td>
                            <td>
                                <xsl:value-of select="year"/>
                            </td>
                            <td>
                                <xsl:value-of select="price"/>
                            </td>
                            <td>
                                <xsl:value-of select="printing"/>
                            </td>
                            <td>
                                <xsl:value-of select="ship_weight"/>
                            </td>
                            <td>
                                <xsl:value-of select="isbn-10-isbn"/>
                            </td>
                            <td>
                                <xsl:value-of select="isbn-13"/>
                            </td>
                            <td>
                                <xsl:value-of select="in_stock"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
