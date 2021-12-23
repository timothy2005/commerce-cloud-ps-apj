package com.bunnings.facades.product;


import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.basecommerce.enums.InStockStatus;
import de.hybris.platform.basecommerce.enums.StockLevelStatus;
import de.hybris.platform.commercefacades.product.data.StockData;
import de.hybris.platform.core.model.c2l.RegionModel;
import de.hybris.platform.core.model.product.ProductModel;
import de.hybris.platform.deliveryzone.model.ZoneModel;
import de.hybris.platform.ordersplitting.model.StockLevelModel;
import de.hybris.platform.ordersplitting.model.WarehouseModel;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.stock.StockService;
import de.hybris.platform.stock.strategy.StockLevelStatusStrategy;
import de.hybris.platform.storelocator.model.PointOfServiceModel;
import de.hybris.platform.variants.model.GenericVariantProductModel;
import org.apache.commons.configuration.Configuration;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertNotNull;
import static junit.framework.TestCase.assertNull;
import static junit.framework.TestCase.assertTrue;
import static org.apache.logging.log4j.core.util.Assert.isEmpty;
import static org.mockito.Mockito.when;

@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class DefaultBunningsProductFulFillmentFacadeUnitTest {

    @Mock
    private GenericVariantProductModel genericVariantProductModel;

    @Mock
    private PointOfServiceModel pointOfServiceModel;

    @Mock
    private StockService stockService;

    @Mock
    private StockLevelStatusStrategy stockLevelStatusStrategy;


    @Mock
    private ProductModel productModel;

    @Mock
    private ConfigurationService configurationService;

    @Mock
    private Configuration configuration;

    @Mock
    private WarehouseModel warehouseOne;










    @Test
    public void checkIfProductIsNotValidPOAWithStocks() {
        String freightDetail = "Sample_Freight";
        String itemNumber = "AUW810110";

       
        isEmpty("test.test.test");
    }

   
  
}
