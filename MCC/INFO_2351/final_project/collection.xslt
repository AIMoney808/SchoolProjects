<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="2.0">

    <xsl:template match="/">
        <html>
            <body>

                <table border="0">
                    <tr>
                        <th>--------</th>
                        <th>
                            <h2>Entertainment Collection</h2>
                        </th>
                        <th>------------------------------------------------------</th>
                        <th>
                            <h5>aimahoney1@mail.mccneb.edu</h5>
                        </th>
                        <th>------------------</th>
                    </tr>
                </table>

                <table border="1">

                    <tr bgcolor="#9acd32">
                        <!--books-->
                        <th>
                            <h4>
                                <xsl:value-of select="assortment/shelf/name"/>
                            </h4>
                        </th>
                        <th>Author</th>
                        <th>Year Published</th>
                        <th>Genre</th>
                        <th>Value</th>

                        <xsl:for-each select="assortment/shelf/book">
                            <tr>
                                <td>
                                    <xsl:value-of select="title"/>
                                </td>
                                <td>
                                    <xsl:value-of select="author"/>
                                </td>
                                <td>
                                    <xsl:value-of select="pubdate"/>
                                </td>
                                <td>
                                    <xsl:value-of select="genre"/>
                                </td>
                                <td>
                                    <xsl:value-of select="value"/>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tr>


                    <tr bgcolor="#9acd32">
                        <!--games-->
                        <th>
                            <h4>
                                <xsl:value-of select="assortment/library/name"/>
                            </h4>
                        </th>
                        <th>Publisher</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Value</th>

                        <xsl:for-each select="assortment/library/game">
                            <tr>
                                <td>
                                    <xsl:value-of select="title"/>
                                </td>
                                <td>
                                    <xsl:value-of select="publisher"/>
                                </td>
                                <td>
                                    <xsl:value-of select="releaseDate"/>
                                </td>
                                <td>
                                    <xsl:value-of select="genre"/>
                                </td>
                                <td>
                                    <xsl:value-of select="value"/>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tr>


                    <tr bgcolor="#9acd32">
                        <!--movies-->
                        <th>
                            <h4>
                                <xsl:value-of select="assortment/selection/name"/>
                            </h4>
                        </th>
                        <th>Producer</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Run Time</th>

                        <xsl:for-each select="assortment/selection/movie">
                            <tr>
                                <td>
                                    <xsl:value-of select="title"/>
                                </td>
                                <td>
                                    <xsl:value-of select="producer"/>
                                </td>
                                <td>
                                    <xsl:value-of select="releaseDate"/>
                                </td>
                                <td>
                                    <xsl:value-of select="genre"/>
                                </td>
                                <td>
                                    <xsl:value-of select="runTime"/>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tr>



                    <tr bgcolor="#9acd32">
                        <!--music-->
                        <th>
                            <h4>
                                <xsl:value-of select="assortment/tracks/name"/>
                            </h4>
                        </th>
                        <th>Author</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Track Count</th>

                        <xsl:for-each select="assortment/tracks/album">
                            <tr>
                                <td>
                                    <xsl:value-of select="title"/>
                                </td>
                                <td>
                                    <xsl:value-of select="author"/>
                                </td>
                                <td>
                                    <xsl:value-of select="releaseDate"/>
                                </td>
                                <td>
                                    <xsl:value-of select="genre"/>
                                </td>
                                <td>
                                    <xsl:value-of select="trackCount"/>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tr>
                </table>

            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
