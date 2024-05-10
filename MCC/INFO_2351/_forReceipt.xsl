<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="html"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Receipt</title>
                <link rel="stylesheet" type="text/css" href="receipt.css" />
            </head>
            <body>
                <h1>This is a receipt!</h1>
                <table>
                    <tr>
                        <th>Register Number</th>
                    </tr>
                    <tr>
                        <th>Date</th>
                    </tr>
                    <tr>
                        <th>Store</th>
                    </tr>
                    <tr>
                        <th>Customer Number</th>
                    </tr>
                    <tr>
                        <td><xsl:value-of select="transaction/regNum"/></td>
                    </tr>
                    <tr>
                        <td><xsl:value-of select="transaction/date"/></td>
                    </tr>
                    <tr>
                        <td><xsl:value-of select="transaction/store"/></td>
                    </tr>
                    <tr>
                        <td><xsl:value-of select="transaction/CustomerNumber"/></td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <th>UPC</th>
                        <th>Price</th>
                        <th>Department</th>
                        <th>Quantity</th>
                        <th>Extended Price</th>
                    </tr>
                    <xsl:for-each select="transaction/Order/item">
                        <tr>
                            <td><xsl:value-of select="description"/></td>
                            <td><xsl:value-of select="UPC"/></td>
                            <td><xsl:value-of select="price"/></td>
                            <td><xsl:value-of select="department"/></td>
                            <td><xsl:value-of select="quantity"/></td>
                            <td><xsl:value-of select="extPrice"/></td>
                        </tr>
                    </xsl:for-each>
                    <tr>
                        <td>Item Count</td>
                        <td><xsl:value-of select="transaction/itemCount"/></td>
                    </tr>
                    <tr>
                        <td>Tax</td>
                        <td><xsl:value-of select="transaction/tax"/></td>
                    </tr>
                    <tr>
                        <td>Total Price</td>
                        <td><xsl:value-of select="transaction/totalPrice"/></td>
                    </tr>
                    <tr>
                        <td>TotalPaid</td>
                        <td><xsl:value-of select="transaction/totalPaid/@method"/></td>
                    </tr>
                    <tr>
                        <td>Payment Details</td>
                        <td><xsl:value-of select="transaction/paymentDetails/@method"/></td>
                    </tr>
                </table>
            </body>
        </html>   
    </xsl:template>
</xsl:stylesheet>