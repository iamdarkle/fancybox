<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Configurator;

class DefineGalleryTemplate
{
    public function __invoke(Configurator $config)
    {
        $tag = $config->tags->add('FANCYBOX-GALLERY');
        $tag->template = '<div class="fancybox-gallery"><xsl:apply-templates/></div>';

        $tag = $config->tags->add('FANCYBOX-GALLERY-ITEM');
        $tag->template = '<xsl:apply-templates/>';

        if ($config->tags->exists('IMG')) {
            $tag = $config->tags->get('IMG');
            $newTemplate = $tag->template;
            $tag->template = <<<XML
                <xsl:choose>
                    <xsl:when test="parent::FANCYBOX-GALLERY-ITEM">
                        <a data-fancybox="gallery" href="{@url}">
                            $newTemplate
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        $newTemplate
                    </xsl:otherwise>
                </xsl:choose>
            XML;
        }
    }
}
