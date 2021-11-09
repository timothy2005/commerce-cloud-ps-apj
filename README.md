# commerce-cloud-ps-apj
Repo for ps apj

# Branch naming convention: <Commerce_Major_Version>+<additional_remark>
# Sample manifest contains Commerce b2b, b2c, smartedit, mediaconversion, cloud hot folder, scpi.( No spartacus yet)
# Commerce Version 
1. 1811(EOMM)(CEP 1811)
2. 1905(CEP1905)
3. 2005(IntPack2005)
4. 2011(IntPack2102)
5. 2105 (IntPack2108)

# How to use CEP (CEP is deprecated since 2005, use integration pack instead)
"commerceSuiteVersion": "1905",
"useCloudExtensionPack": true,

# How to use integration pack(https://help.sap.com/viewer/2f43049ad8e443249e1981575adddb5d/2108/en-US/19bacaecbdd34cc8bd58bdd8daf428c5.html)
"commerceSuiteVersion": "2005",    
"extensionPacks": [
        {
            "name": "hybris-commerce-integrations",
            "version": "2005.5"
        }
    ],
