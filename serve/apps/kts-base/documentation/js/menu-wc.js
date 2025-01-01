'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-typescript-starter documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CatsModule.html" data-type="entity-link" >CatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CatsModule-faa0b4a4963eec3420a9b806320bd24fa7c2210530fa5136176dde960584b74981c942b47d9d227d954406ea79f40401713642df0b81a6b5398ab73b029dd3fc"' : 'data-bs-target="#xs-controllers-links-module-CatsModule-faa0b4a4963eec3420a9b806320bd24fa7c2210530fa5136176dde960584b74981c942b47d9d227d954406ea79f40401713642df0b81a6b5398ab73b029dd3fc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CatsModule-faa0b4a4963eec3420a9b806320bd24fa7c2210530fa5136176dde960584b74981c942b47d9d227d954406ea79f40401713642df0b81a6b5398ab73b029dd3fc"' :
                                            'id="xs-controllers-links-module-CatsModule-faa0b4a4963eec3420a9b806320bd24fa7c2210530fa5136176dde960584b74981c942b47d9d227d954406ea79f40401713642df0b81a6b5398ab73b029dd3fc"' }>
                                            <li class="link">
                                                <a href="controllers/CatsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CatsModule-faa0b4a4963eec3420a9b806320bd24fa7c2210530fa5136176dde960584b74981c942b47d9d227d954406ea79f40401713642df0b81a6b5398ab73b029dd3fc"' : 'data-bs-target="#xs-injectables-links-module-CatsModule-faa0b4a4963eec3420a9b806320bd24fa7c2210530fa5136176dde960584b74981c942b47d9d227d954406ea79f40401713642df0b81a6b5398ab73b029dd3fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CatsModule-faa0b4a4963eec3420a9b806320bd24fa7c2210530fa5136176dde960584b74981c942b47d9d227d954406ea79f40401713642df0b81a6b5398ab73b029dd3fc"' :
                                        'id="xs-injectables-links-module-CatsModule-faa0b4a4963eec3420a9b806320bd24fa7c2210530fa5136176dde960584b74981c942b47d9d227d954406ea79f40401713642df0b81a6b5398ab73b029dd3fc"' }>
                                        <li class="link">
                                            <a href="injectables/CatsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabaseModule-58b23e11f4c6fce5c4e2def5776701f736088e86c7660b3a28ee1d10c25258efbb7aef62c66179adf22c7af9e5b2bc3dbbabf8ea22acff9744213162a4b60a8b"' : 'data-bs-target="#xs-injectables-links-module-DatabaseModule-58b23e11f4c6fce5c4e2def5776701f736088e86c7660b3a28ee1d10c25258efbb7aef62c66179adf22c7af9e5b2bc3dbbabf8ea22acff9744213162a4b60a8b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-58b23e11f4c6fce5c4e2def5776701f736088e86c7660b3a28ee1d10c25258efbb7aef62c66179adf22c7af9e5b2bc3dbbabf8ea22acff9744213162a4b60a8b"' :
                                        'id="xs-injectables-links-module-DatabaseModule-58b23e11f4c6fce5c4e2def5776701f736088e86c7660b3a28ee1d10c25258efbb7aef62c66179adf22c7af9e5b2bc3dbbabf8ea22acff9744213162a4b60a8b"' }>
                                        <li class="link">
                                            <a href="injectables/DrizzleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DrizzleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link" >EventsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RecipesModule.html" data-type="entity-link" >RecipesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RecipesModule-8c85317bb1433742acb0fb51d9df1b9ecc4153ea2829996f079ad5e05b035dc6fafcee1615a9afdf34de8a128ae2e4d9f23954aff265396f1e2140f54d95569e"' : 'data-bs-target="#xs-injectables-links-module-RecipesModule-8c85317bb1433742acb0fb51d9df1b9ecc4153ea2829996f079ad5e05b035dc6fafcee1615a9afdf34de8a128ae2e4d9f23954aff265396f1e2140f54d95569e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RecipesModule-8c85317bb1433742acb0fb51d9df1b9ecc4153ea2829996f079ad5e05b035dc6fafcee1615a9afdf34de8a128ae2e4d9f23954aff265396f1e2140f54d95569e"' :
                                        'id="xs-injectables-links-module-RecipesModule-8c85317bb1433742acb0fb51d9df1b9ecc4153ea2829996f079ad5e05b035dc6fafcee1615a9afdf34de8a128ae2e4d9f23954aff265396f1e2140f54d95569e"' }>
                                        <li class="link">
                                            <a href="injectables/RecipesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-2466d4db1daca71bbab4bd75e63f9ef0b825543b02375909fc9cb4d6e1f43b24f0030b064e4bd5d30c4c24420ee3cdaf527ca0c6e5d47a566ef29c4114595afa"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-2466d4db1daca71bbab4bd75e63f9ef0b825543b02375909fc9cb4d6e1f43b24f0030b064e4bd5d30c4c24420ee3cdaf527ca0c6e5d47a566ef29c4114595afa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-2466d4db1daca71bbab4bd75e63f9ef0b825543b02375909fc9cb4d6e1f43b24f0030b064e4bd5d30c4c24420ee3cdaf527ca0c6e5d47a566ef29c4114595afa"' :
                                        'id="xs-injectables-links-module-RedisModule-2466d4db1daca71bbab4bd75e63f9ef0b825543b02375909fc9cb4d6e1f43b24f0030b064e4bd5d30c4c24420ee3cdaf527ca0c6e5d47a566ef29c4114595afa"' }>
                                        <li class="link">
                                            <a href="injectables/RedisRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TasksModule-2ad843df0a9bcb00e15b7021099ea0ef2564955b2d5a54d42a4e0dda9d951a27dab5a149c262abca730a66ed7b15824e755e5d1c6750f7792ee3753502c91834"' : 'data-bs-target="#xs-injectables-links-module-TasksModule-2ad843df0a9bcb00e15b7021099ea0ef2564955b2d5a54d42a4e0dda9d951a27dab5a149c262abca730a66ed7b15824e755e5d1c6750f7792ee3753502c91834"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-2ad843df0a9bcb00e15b7021099ea0ef2564955b2d5a54d42a4e0dda9d951a27dab5a149c262abca730a66ed7b15824e755e5d1c6750f7792ee3753502c91834"' :
                                        'id="xs-injectables-links-module-TasksModule-2ad843df0a9bcb00e15b7021099ea0ef2564955b2d5a54d42a4e0dda9d951a27dab5a149c262abca730a66ed7b15824e755e5d1c6750f7792ee3753502c91834"' }>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/CatsController.html" data-type="entity-link" >CatsController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppGateway.html" data-type="entity-link" >AppGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppGateway-1.html" data-type="entity-link" >AppGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCatDto.html" data-type="entity-link" >CreateCatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateScalar.html" data-type="entity-link" >DateScalar</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionsFilter.html" data-type="entity-link" >ExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewRecipeInput.html" data-type="entity-link" >NewRecipeInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParamsDto.html" data-type="entity-link" >PaginationParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryFailedFilter.html" data-type="entity-link" >QueryFailedFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Recipe.html" data-type="entity-link" >Recipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecipesArgs.html" data-type="entity-link" >RecipesArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecipesResolver.html" data-type="entity-link" >RecipesResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/SettingService.html" data-type="entity-link" >SettingService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CatsService.html" data-type="entity-link" >CatsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DrizzleService.html" data-type="entity-link" >DrizzleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExceptionInterceptor.html" data-type="entity-link" >ExceptionInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpCacheInterceptor.html" data-type="entity-link" >HttpCacheInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpConfigService.html" data-type="entity-link" >HttpConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtUtilService.html" data-type="entity-link" >JwtUtilService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseIntPipe.html" data-type="entity-link" >ParseIntPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecipesService.html" data-type="entity-link" >RecipesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedisRepository.html" data-type="entity-link" >RedisRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResolvePromisesInterceptor.html" data-type="entity-link" >ResolvePromisesInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TasksService.html" data-type="entity-link" >TasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidationPipe.html" data-type="entity-link" >ValidationPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Cat.html" data-type="entity-link" >Cat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabaseError.html" data-type="entity-link" >DatabaseError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabaseOptions.html" data-type="entity-link" >DatabaseOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EnvironmentVariables.html" data-type="entity-link" >EnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAwsConfig.html" data-type="entity-link" >IAwsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISwaggerConfigInterface.html" data-type="entity-link" >ISwaggerConfigInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RedisRepositoryInterface.html" data-type="entity-link" >RedisRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});